import * as React from "react";
import { Box, ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import "@fontsource/jomhuria/";
import "@fontsource/ubuntu";
import StatisticsPage from "./pages/statistics";
import "./main.css";
import { RedirectPage } from "./pages/redirect";
import SecondaryButton from "./components/SecondaryButton";
import NavBar from "./components/NavBar";
import VisitedUrlsPage from "./pages/visited";
import {NotFoundPage} from "./pages/not-found";

require("dotenv").config();

const theme = extendTheme({
  fonts: {
    heading: "Jomhuria",
    body: "Ubuntu",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box>
      <NavBar />
      <Switch>
        <Route path="/visited" component={VisitedUrlsPage} />
        <Route path="/statistics/:id" component={StatisticsPage} />
        <Route path="/404" component={NotFoundPage} />
        <Route path="/:id" component={RedirectPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Box>
  </ChakraProvider>
);
