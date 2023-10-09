import { MantineProvider } from "@mantine/core";

export const ThemeProvider = ({ children }) => (
  <MantineProvider
    theme={{ colorScheme: "dark" }}
    withGlobalStyles
    withNormalizeCSS
  >
    {children}
  </MantineProvider>
);
