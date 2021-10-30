import React, { useMemo, useEffect } from "react";
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
import ExcalidrawExtension from "./Extensions/Excalidraw";
import CodeBlock from "./Extensions/CodeBlock";
import ExecutionBlock from "./Extensions/ExecutionBlock";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const ROOM_ID = "velocity";
const socketUrl = process.env.REACT_APP_WS_URL;

const colors = [
  "#958DF1",
  "#F98181",
  "#FBBC88",
  "#FAF594",
  "#70CFF8",
  "#94FADB",
  "#B9F18D",
];

const names = [
  "Lea Thompson",
  "Cyndi Lauper",
  "Tom Cruise",
  "Madonna",
  "Jerry Hall",
  "Joan Collins",
  "Winona Ryder",
  "Christina Applegate",
  "Alyssa Milano",
  "Molly Ringwald",
  "Ally Sheedy",
  "Debbie Harry",
  "Olivia Newton-John",
  "Elton John",
  "Michael J. Fox",
  "Axl Rose",
  "Emilio Estevez",
  "Ralph Macchio",
  "Rob Lowe",
  "Jennifer Grey",
  "Mickey Rourke",
  "John Cusack",
  "Matthew Broderick",
  "Justine Bateman",
  "Lisa Bonet",
];

const Editor = () => {
  const getRandomElement = (list) =>
    list[Math.floor(Math.random() * list.length)];

  const getRandomColor = () => getRandomElement(colors);
  const getRandomName = () => getRandomElement(names);

  const { ydoc, provider } = useMemo(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(socketUrl, ROOM_ID, ydoc);

    return { ydoc, provider };
  }, []);

  useEffect(() => {
    return () => {
      provider.disconnect();
    };
  }, [provider]);

  const editor = useEditor({
    // editable: false,
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: getRandomName(),
          color: getRandomColor(),
        },
      }),
      ExcalidrawExtension,
      CodeBlock,
      ExecutionBlock,
    ],
    //     content: `
    //     <p>
    //     That’s a boring paragraph followed by a fenced code block:
    //   </p>
    //   <pre><executionBlock class="language-javascript">for (var i=1; i <= 20; i++)
    // {
    // if (i % 15 == 0)
    // console.log("FizzBuzz");
    // else if (i % 3 == 0)
    // console.log("Fizz");
    // else if (i % 5 == 0)
    // console.log("Buzz");
    // else
    // console.log(i);
    // }</code></pre>
    // <ExecutionBlock>
    // Implementation of the Sieve of Eratosthenes
    // # https://stackoverflow.com/questions/3939660/sieve-of-eratosthenes-finding-primes-python

    // # Finds all prime numbers up to n
    // def eratosthenes(n):
    //     multiples = []
    //     for i in range(2, n+1):
    //         if i not in multiples:
    //             print (i)
    //             for j in range(i*i, n+1, i):
    //                 multiples.append(j)

    // eratosthenes(100)
    // </ExecutionBlock>
    //   <p>
    //     Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
    //   </p>
    //   <Excalidraw></Excalidraw>
    //     `,
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
          className={bubbleMenuStyles(
            editor?.isActive("excalidraw") || !editor.isEditable
          )}
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
          <button
            onClick={() => editor.chain().focus().toggleExecutionBlock().run()}
            className={editor.isActive("executionBlock") ? "is-active" : ""}
          >
            Python
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            Code
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleExcalidrawBlock()
                .selectNodeBackward()
                .run()
            }
            className={editor.isActive("excalidraw") ? "is-active" : ""}
          >
            Draw
          </button>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};
export default Editor;
