import { decode } from "html-entities";
import { useEffect, useState } from "react";

export const useGame = () => {
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = async () => {
    const { results } = await fetch(
      "https://opentdb.com/api.php?amount=1",
    ).then((res) => res.json());

    const q = results[0];
    const i = Math.floor(Math.random() * 2);
    const options = [];
    options[i] = decode(q.correct_answer);
    options[(i + 1) % 2] = decode(q.incorrect_answers[0]);

    setQuiz({
      question: decode(q.question),
      answer: decode(q.correct_answer),
      options,
    });
  };

  return { getQuiz, quiz };
};
