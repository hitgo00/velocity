import React, { useEffect, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';

import Quiz from './component';
import axios from 'axios';

function extractContent(s) {
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
}

const ques = [
  {
    answer: 'cricketer',
    context:
      'Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team.',
    extra_options: [
      'Mark Waugh',
      'Sharma',
      'Ricky Ponting',
      'Afridi',
      'Kohli',
      'Dhoni',
    ],
    id: 1,
    options: ['Brett Lee', 'Footballer', 'International Cricket'],
    options_algorithm: 'sense2vec',
    question_statement: "What is Sachin Ramesh Tendulkar's career?",
    question_type: 'MCQ',
  },
  {
    answer: 'india',
    context:
      'Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team.',
    extra_options: [
      'Pakistan',
      'South Korea',
      'Nepal',
      'Philippines',
      'Zimbabwe',
    ],
    id: 2,
    options: ['Bangladesh', 'Indonesia', 'China'],
    options_algorithm: 'sense2vec',
    question_statement: 'Where is Sachin Ramesh Tendulkar from?',
    question_type: 'MCQ',
  },
  {
    answer: 'batsmen',
    context:
      'He is widely regarded as one of the greatest batsmen in the history of cricket.',
    extra_options: ['Ashwin', 'Dhoni', 'Afridi', 'Death Overs'],
    id: 3,
    options: ['Bowlers', 'Wickets', 'Mccullum'],
    options_algorithm: 'sense2vec',
    question_statement: 'What is the best cricketer?',
    question_type: 'MCQ',
  },
];

const QuizBlock = ({ editor, node, updateAttributes }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .post(`https://8430-123-201-39-202.ngrok.io/predict`, {
        payload: extractContent(editor.getHTML()),
      })
      .then((result) => {
        console.log(result.data);
        if (result?.data?.questions?.length) {
          setQuestions(result.data.questions);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [editor]);

  return (
    <NodeViewWrapper>
      <Quiz quizQuestions={questions} />
    </NodeViewWrapper>
  );
};

export default QuizBlock;
