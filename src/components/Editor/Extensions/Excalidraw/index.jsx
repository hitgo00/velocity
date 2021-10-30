import { Node, mergeAttributes } from "@tiptap/core";

import { ReactNodeViewRenderer } from "@tiptap/react";

import Nodeview from "./NodeView";

const ExcalidrawExtension = Node.create({
  name: "excalidraw",
  group: "block",
  atom: true,

  parseHTML() {
    return [
      {
        tag: "Excalidraw",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["Excalidraw", mergeAttributes(HTMLAttributes)];
  },

  addAttributes() {
    return {
      elements: {
        default: null,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Nodeview);
  },

  addCommands() {
    return {
      toggleExcalidrawBlock:
        (_attributes) =>
        ({ commands }) => {
          return commands.insertContent("<Excalidraw></Excalidraw>");
        },
    };
  },
});

export default ExcalidrawExtension;
