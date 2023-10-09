import { Container } from "@mantine/core";
import { ThemeProvider } from "./ThemeProvider";
import { Game } from "./game/Game";

function App() {
  return (
    <ThemeProvider>
      <Container
        sx={{
          height: "75%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Game />
      </Container>
    </ThemeProvider>
  );
}

export default App;
