import _ from 'lodash';
import React, { useState } from 'react';

import * as Models from './../models';
import './Card.scss';

interface Props {
  quizQuestions?: Models.QuizResponse;
}

const Card = (props: Props) => {
  const quizQuestions = _.get(props, 'quizQuestions.results', []);
  const initialState = {
    currentIndex: 0,
    score: 0,
    showFinished: false,
    answered: false,
    selectedOption: '',
    revealAnswer: '',
  };

  const [state, setState] = useState(initialState);

  const {
    currentIndex,
    score,
    revealAnswer,
    selectedOption,
  } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, correctAnswer: Models.Quiz): void => {
    e.persist();
    e.preventDefault();
    const isCorrect: boolean = e.target.id.includes(correctAnswer.toString()) ? true : false;
    const renderAnswer: string = isCorrect ? 'Correct!' : 'Sorry, wrong answer!';

    setState({
      ...state,
      selectedOption: e.target.id.toString(),
      answered: isCorrect ? true : false,
      revealAnswer: renderAnswer
    });

    if (currentIndex + 1 > quizQuestions.length) {
      setState({ ...state, showFinished: true });
    } else {
      setTimeout(() => {
        setState({ ...state, score: isCorrect ? score + 1 : score + 0, currentIndex: currentIndex + 1, revealAnswer: '' });
      }, 2000);
    }
  };

};

export default Card;
