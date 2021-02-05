import React, { FunctionComponent, useEffect, useState } from 'react';

import * as Models from './../models';
import Card from './Card';
import './Main.scss';

const MainContainer: FunctionComponent<{ initial?: Models.QuizResponse; }> = ({ initial }) => {

  const [quizzes, setQuizzes] = useState(initial);
  const [shouldShowCards, setShouldShowCards] = useState(false);

  const fetchData = async (): Promise<void> => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=boolean');
    res.json()
      .then((res) => setQuizzes(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (): void => {
    setShouldShowCards(true);
  };

  return (
    <main className='Main'>
      {!shouldShowCards ? (
        <>
          <h2>Welcome to Quizz Buzz</h2>
          <div className='StartEndCard'>
            <h2>Answer 10 random true or false questions</h2>
            <p>Can you get a perfect score?</p>

            <button type='submit' className='Button' onClick={() => handleButtonClick()}>Get Started!</button>
          </div>
        </>
      ) : <Card quizQuestions={quizzes} />}
    </main>
  );
};

export default MainContainer;
