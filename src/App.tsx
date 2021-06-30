import * as React from "react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import "@fontsource/jomhuria/";
import "@fontsource/ubuntu";
import StatisticsPage from "./pages/statistics";

const theme = extendTheme({
  fonts: {
    heading: "Jomhuria",
    body: "Ubuntu",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box minH="100vh" w="100%" bg="#364d66">
      <Switch>
        <Route path="/statistics/:id" component={StatisticsPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Box>
  </ChakraProvider>
);
