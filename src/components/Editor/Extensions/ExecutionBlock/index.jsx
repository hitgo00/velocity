import { Node , mergeAttributes} from "@tiptap/core";

import { ReactNodeViewRenderer } from "@tiptap/react";

import Nodeview from "./NodeView";

const ExecutionBlock = Node.create({
  name: "executionBlock",
  content: 'text*',

  group: 'block',

  code: true,

  defining: true,

  parseHTML() {
    return [
      {
        tag: "ExecutionBlock",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["ExecutionBlock", mergeAttributes(HTMLAttributes)];
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
      setExecutionBlock: attributes => ({ commands }) => {
        return commands.setNode('executionBlock', attributes)
      },
      toggleExecutionBlock: attributes => ({ commands }) => {
        return commands.toggleNode('executionBlock', 'paragraph', attributes)
      },
    }
  },
});

export default ExecutionBlock;
