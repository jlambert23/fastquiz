import { Title } from "@mantine/core";

export const Result = ({ result }) => (
  <Title
    align="center"
    sx={(theme) => ({
      color: result ? theme.colors.green[7] : theme.colors.red[7],
    })}
  >
    {result ? "Correct!" : "Wrong!"}
  </Title>
);
