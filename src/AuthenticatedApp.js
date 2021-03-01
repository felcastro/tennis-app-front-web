import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Box, Flex, useColorMode, useTheme } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import SidebarMenu from "./components/SidebarMenu";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
// import Configuration from "./pages/Configuration";
import Places from "./pages/Places";
import Place from "./pages/Place";
import BookCourt from "./pages/Place/BookCourt";
import EditPlace from "./pages/Place/EditPlace";
import EditScheadule from "./pages/Place/EditScheadule";
import Account from "./pages/Account";
import EditInfo from "./pages/Account/EditInfo";

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
            <Route path="/places" exact component={Places} />
            <Route path="/places/:id" exact component={Place} />
            <Route path="/places/:id/book-court" exact component={BookCourt} />
            <Route path="/places/:id/edit" exact component={EditPlace} />
            <Route
              path="/places/:id/scheadules/new"
              exact
              component={EditScheadule}
            />
            <Route
              path="/places/:id/scheadules/:scheaduleId/edit"
              exact
              component={EditScheadule}
            />
            <Route path="/account" exact component={Account} />
            <Route path="/account/edit-info" component={EditInfo} />
            <Redirect to="/home" />
          </Switch>
        </Flex>
      </Box>
    </Router>
  );
};
