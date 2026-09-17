"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Link as LinkIcon, List, ListOrdered, Maximize2, Minimize2, RemoveFormatting } from "lucide-react";

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const savedRange = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [imagePanel, setImagePanel] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = value || "";
    // The modal remounts for each article; subsequent content is owned by contentEditable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sync = () => onChange(editorRef.current?.innerHTML || "");
  const rememberSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount && editorRef.current?.contains(selection.anchorNode)) {
      savedRange.current = selection.getRangeAt(0).cloneRange();
    }
  };
  const restoreSelection = () => {
    editorRef.current?.focus();
    if (!savedRange.current) return;
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange.current);
  };
  const format = (command, argument = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    sync();
  };
  const addLink = () => {
    rememberSelection();
    const url = window.prompt("Paste the link address");
    if (!url) return;
    restoreSelection();
    format("createLink", url);
  };
  const addImage = () => {
    const url = imageUrl.trim();
    if (!url) return;
    restoreSelection();
    document.execCommand("insertHTML", false, `<figure><img src="${url.replaceAll('"', "&quot;")}" alt="" /><figcaption>Click here to add an image caption</figcaption></figure><p><br></p>`);
    setImageUrl("");
    setImagePanel(false);
    sync();
  };

  return (
    <div className={`rich-editor${fullscreen ? " rich-editor-fullscreen" : ""}`}>
      <div className="rich-editor-toolbar" role="toolbar" aria-label="Article formatting">
        <button type="button" title="Bold" onClick={() => format("bold")}><strong>B</strong></button>
        <button type="button" title="Italic" onClick={() => format("italic")}><em>I</em></button>
        <button type="button" title="Underline" onClick={() => format("underline")}><u>U</u></button>
        <span />
        <button type="button" title="Main section heading" onClick={() => format("formatBlock", "H2")}>H2</button>
        <button type="button" title="Subheading" onClick={() => format("formatBlock", "H3")}>H3</button>
        <button type="button" title="Paragraph" onClick={() => format("formatBlock", "P")}>¶</button>
        <span />
        <button type="button" title="Bullet list" onClick={() => format("insertUnorderedList")}><List /></button>
        <button type="button" title="Numbered list" onClick={() => format("insertOrderedList")}><ListOrdered /></button>
        <button type="button" title="Add link" onClick={addLink}><LinkIcon /></button>
        <button type="button" title="Clear formatting" onClick={() => format("removeFormat")}><RemoveFormatting /></button>
        <button type="button" className={imagePanel ? "active" : ""} title="Add image from a URL" onClick={() => { rememberSelection(); setImagePanel(current => !current); }}><ImageIcon /> Image</button>
        <button type="button" className="rich-editor-expand" title={fullscreen ? "Close full-screen editor" : "Open full-screen editor"} onClick={() => setFullscreen(current => !current)}>{fullscreen ? <Minimize2 /> : <Maximize2 />} {fullscreen ? "Close full view" : "Full view"}</button>
      </div>
      {imagePanel && (
        <div className="rich-editor-image-panel">
          <label>Image address<input type="url" value={imageUrl} onChange={event => setImageUrl(event.target.value)} placeholder="https://example.com/image.jpg" onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addImage(); } }} /></label>
          <button type="button" className="button" onClick={addImage}>Insert image</button>
          <button type="button" className="button secondary" onClick={() => setImagePanel(false)}>Cancel</button>
        </div>
      )}
      <div ref={editorRef} className="rich-editor-content" contentEditable suppressContentEditableWarning data-placeholder="Start writing your article here…" onInput={sync} onKeyUp={rememberSelection} onMouseUp={rememberSelection} />
      <div className="rich-editor-footer"><span>Use headings to divide the article into clear sections.</span><strong>{Math.max(1, Math.ceil(String(value || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length / 200))} min read</strong></div>
    </div>
  );
}
