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
import Matches from "./pages/Matches";
// import Configuration from "./pages/Configuration";
import Account from "./pages/Account";
import EditInfo from "./pages/Account/EditInfo";
import SearchPreferences from "./pages/Account/SearchPreferences";

export default () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Router>
      <Box bg={colors.mainBg[colorMode]} color={colors.mainFont[colorMode]}>
        <Navbar />
        <SidebarMenu />
        <Flex
          as="main"
          pt="4rem"
          pl={{ base: "none", md: "14rem" }}
          w="100%"
          minH="100vh"
          justifyContent="center"
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/matches" component={Matches} />
            {/* <Route path="/configuration" component={Configuration} /> */}
            <Route path="/account" exact component={Account} />
            <Route path="/account/edit-info" component={EditInfo} />
            <Route
              path="/account/search-preferences"
              component={SearchPreferences}
            />
            <Redirect to="/home" />
          </Switch>
        </Flex>
      </Box>
    </Router>
  );
};
