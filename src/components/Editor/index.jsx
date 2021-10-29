import React from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  containerStyles,
  bubbleMenuStyles,
  floatingMenuStyles,
} from "./styles.js";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
    <p>
    That’s a boring paragraph followed by a fenced code block:
  </p>
  <pre><executionBlock class="language-javascript">for (var i=1; i <= 20; i++)
{
if (i % 15 == 0)
console.log("FizzBuzz");
else if (i % 3 == 0)
console.log("Fizz");
else if (i % 5 == 0)
console.log("Buzz");
else
console.log(i);
}</code></pre>
  <p>
    Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
  </p>

    `,
  });

  return (
    <div className={containerStyles}>
      {editor && (
        <div style={{ paddingBottom: "20px" }}>
          Word count:{editor.getCharacterCount()}{" "}
        </div>
      )}
      {editor && (
        <BubbleMenu
          className={bubbleMenuStyles}
          tippyOptions={{
            duration: 100,
          }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className={floatingMenuStyles}
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};
export default Editor;
