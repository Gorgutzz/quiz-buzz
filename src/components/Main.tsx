import React, { FunctionComponent, useEffect, useState } from 'react';

import * as Models from './../models';
import Card from './Card';
import './Main.scss';

const MainContainer: FunctionComponent<{ initial?: Models.QuizResponse; }> = ({ initial }) => {

  const [quizzes, setQuizzes] = useState(initial);
  const [shouldShowCards, setShouldShowCards] = useState(false);

  const fetchData = async (): Promise<void> => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&type=boolean');
    res.json()
      .then((res) => setQuizzes(res))
      .catch((err) => console.log(err));
  };


  return (
    <main className='Main'>
    </main>
  );
};

export default MainContainer;
