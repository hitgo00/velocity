import { Node, mergeAttributes } from '@tiptap/core';

import { ReactNodeViewRenderer } from '@tiptap/react';

import Nodeview from './NodeView';

const ExcalidrawExtension = Node.create({
  name: 'embed',
  group: 'block',
  atom: true,

  parseHTML() {
    return [
      {
        tag: 'Embed',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['Embed', mergeAttributes(HTMLAttributes)];
  },

  addAttributes() {
    return {
      url: {
        default: null,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Nodeview);
  },

  addCommands() {
    return {
      toggleEmbedBlock:
        (_attributes) =>
        ({ commands }) => {
          return commands.insertContent('<Embed></Embed>');
        },
    };
  },
});

export default ExcalidrawExtension;
