import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Group,
  MantineProvider,
  Title,
} from '@mantine/core';
import { decode } from 'html-entities';

function App() {
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = async () => {
    const { results } = await fetch(
      'https://opentdb.com/api.php?amount=1'
    ).then((res) => res.json());
    const q = results[0];
    setQuiz({
      question: decode(q.question),
      options: [decode(q.correct_answer), decode(q.incorrect_answers[0])],
      answer: decode(q.correct_answer),
    });
  };

  const handleClick = () => {
    getQuiz();
  };

  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container
        sx={{
          height: '75%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={(theme) => ({ backgroundColor: theme.colors.dark[6] })}
          shadow
        >
          <Title align='center' mb='md'>
            {quiz?.question}
          </Title>
          <Group position='center'>
            {quiz &&
              quiz.options.map((o) => (
                <Button key={o} size='xl' onClick={handleClick}>
                  {o}
                </Button>
              ))}
          </Group>
        </Card>
      </Container>
    </MantineProvider>
  );
}

export default App;
