import { Button, Group } from "@mantine/core";

export const Options = ({ options = [], onClick = () => null }) => (
  <Group position="center">
    {options.map((o) => (
      <Button key={o} size="xl" onClick={() => onClick(o)}>
        {o}
      </Button>
    ))}
  </Group>
);
