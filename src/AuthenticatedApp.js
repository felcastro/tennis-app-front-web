import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Box, Flex, useColorMode, useTheme } from "@chakra-ui/core";

import Navbar from "./components/Navbar";
import SidebarMenu from "./components/SidebarMenu";
import Home from "./pages/Home";
import Configuration from "./pages/Configuration";

export default () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Router>
      <Box bg={colors.mainBg[colorMode]} color={colors.mainFont[colorMode]}>
        <Navbar />
        <SidebarMenu />
        <Box pt="4rem" pl={{base: "none", md: "14rem"}} w="100%" minH="100vh">
          <Box as="main">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/configuration" component={Configuration} />
              <Redirect to="/home" />
            </Switch>
          </Box>
        </Box>
      </Box>
    </Router>
  );
};
