import { Card, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { Options } from "./Options";
import { Result } from "./Result";
import { useGame } from "./use-game";

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const Game = () => {
  const [result, setResult] = useState(true);
  const { quiz, getQuiz } = useGame();

  useEffect(() => {
    setResult(null);
  }, [quiz]);

  const handleClick = async (guess) => {
    setResult(guess === quiz.answer);
    await wait(1000);
    getQuiz();
  };

  return (
    <Card sx={(theme) => ({ backgroundColor: theme.colors.dark[6] })} shadow>
      <Stack spacing="lg">
        <Title align="center">{quiz?.question}</Title>
        {result === null ? (
          <Options options={quiz?.options} onClick={handleClick} />
        ) : (
          <Result result={result} />
        )}
      </Stack>
    </Card>
  );
};
