import path from "node:path";import { mkdir } from "node:fs/promises";
// Runtime media is intentionally outside the compiled bundle on production servers.
export const uploadRoot=path.resolve(/* turbopackIgnore: true */ process.env.UPLOAD_DIR||path.join(process.cwd(),"storage","uploads"));
export async function ensureUploadRoot(){await mkdir(uploadRoot,{recursive:true});return uploadRoot}
export function safeUploadPath(parts){const target=path.resolve(uploadRoot,...parts);if(!target.startsWith(uploadRoot+path.sep))throw new Error("Invalid media path");return target}
export function mediaUrl(filename){return `/api/media/${encodeURIComponent(filename)}`}
