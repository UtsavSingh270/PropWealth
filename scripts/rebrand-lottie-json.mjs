import { readFile, writeFile } from "node:fs/promises";

const [, , file] = process.argv;
if (!file) throw new Error("Provide a Lottie JSON file path.");

const clamp = (value) => Math.max(0, Math.min(1, value));
const palette = {
  primary: [0.9569, 0.1843, 0.4392],
  coral: [1, 0.4196, 0.5451],
  rose: [1, 0.5569, 0.6431],
  pale: [1, 0.8353, 0.8745],
  navy: [0.0431, 0.0588, 0.098],
  slate: [0.0902, 0.1255, 0.2],
};

function recolour(input) {
  if (!Array.isArray(input) || input.length < 3 || input.slice(0, 3).some((value) => typeof value !== "number")) return input;
  const [r, g, b] = input;
  if (Math.max(r, g, b) > 1.01) return input;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const saturation = max ? (max - min) / max : 0;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const naturalSkin = r > g && g > b && luminance > 0.48 && r - g < 0.27 && g - b < 0.25;
  let colour;
  if (saturation < 0.12) colour = input.slice(0, 3);
  else if (naturalSkin) colour = input.slice(0, 3);
  else if (luminance < 0.2) colour = palette.navy;
  else if (luminance < 0.34) colour = palette.slate;
  else if (luminance < 0.52) colour = palette.primary;
  else if (luminance < 0.7) colour = palette.coral;
  else if (luminance < 0.86) colour = palette.rose;
  else colour = palette.pale;
  return [...colour.map(clamp), ...input.slice(3)];
}

function visit(value, colourContext = false) {
  if (Array.isArray(value)) {
    if (colourContext && value.length >= 3 && value.slice(0, 3).every((item) => typeof item === "number")) return recolour(value);
    return value.map((item) => visit(item, colourContext));
  }
  if (!value || typeof value !== "object") return value;
  for (const [key, child] of Object.entries(value)) {
    if ((key === "fc" || key === "sc") && Array.isArray(child)) value[key] = recolour(child);
    else if (key === "c" && child && typeof child === "object") value[key] = visit(child, true);
    else if (colourContext && (key === "k" || key === "s" || key === "e")) value[key] = visit(child, true);
    else value[key] = visit(child, false);
  }
  return value;
}

const animation = JSON.parse(await readFile(file, "utf8"));
await writeFile(file, JSON.stringify(visit(animation)), "utf8");
