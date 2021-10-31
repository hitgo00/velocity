import { Node, mergeAttributes } from '@tiptap/core';

import { ReactNodeViewRenderer } from '@tiptap/react';

import Nodeview from './NodeView';

let a = {
  questionId: {
    questionText: 'what . .. . ? ',
    options: {
      optionId: {
        text: 'Taj',
        isCorrect: true,
      },
    },
  },
};

const QuizExtension = Node.create({
  name: 'quiz',
  group: 'block',
  atom: true,

  parseHTML() {
    return [
      {
        tag: 'Quiz',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['Quiz', mergeAttributes(HTMLAttributes)];
  },

  addAttributes() {
    return {
      questionsMap: {
        default: null,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Nodeview);
  },

  addCommands() {
    return {
      toggleQuizBlock:
        (_attributes) =>
        ({ commands }) => {
          return commands.insertContent('<Quiz></Quiz>');
        },
    };
  },
});

export default QuizExtension;
