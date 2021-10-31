import { Node, mergeAttributes } from '@tiptap/core';

const Title = Node.create({
  name: 'vl_title',
  content: 'inline*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'vl_title',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['vl_title', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setTitle:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode('vl_title', attributes);
        },
      toggleTitle:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode('vl_title', 'paragraph', attributes);
        },
    };
  },
});

export default Title;
