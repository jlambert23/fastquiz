import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Group,
  MantineProvider,
  Stack,
  Title,
} from "@mantine/core";
import { decode } from "html-entities";

function App() {
  const [quiz, setQuiz] = useState();
  const [result, setResult] = useState(true);

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
    setResult(null);
  };

  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleClick = async (guess) => {
    setResult(guess === quiz.answer);
    await wait(1000);
    getQuiz();
  };

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container
        sx={{
          height: "75%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card
          sx={(theme) => ({ backgroundColor: theme.colors.dark[6] })}
          shadow
        >
          <Stack spacing="lg">
            <Title align="center">{quiz?.question}</Title>
            {result === null ? (
              <Group position="center">
                {quiz?.options.map((o) => (
                  <Button key={o} size="xl" onClick={() => handleClick(o)}>
                    {o}
                  </Button>
                ))}
              </Group>
            ) : (
              <Title
                align="center"
                sx={(theme) => ({
                  color: result ? theme.colors.green[7] : theme.colors.red[7],
                })}
              >
                {result ? "Correct!" : "Wrong!"}
              </Title>
            )}
          </Stack>
        </Card>
      </Container>
    </MantineProvider>
  );
}

export default App;
