import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import "@fontsource/jomhuria/";
import "@fontsource/ubuntu";

const theme = extendTheme({
  fonts: {
    heading: "Jomhuria",
    body: "Ubuntu",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </ChakraProvider>
);
