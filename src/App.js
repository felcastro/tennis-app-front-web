import React from "react";
import { Spinner, theme, ChakraProvider, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

export default () => {
  const user = useSelector((state) => state.user);
  const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      sidebarBg: {
        light: "white",
        dark: "gray.900",
      },
      navbarBg: {
        light: "white",
        dark: "gray.900",
      },
      mainBg: {
        light: "gray.50",
        dark: "#0b0c11",
      },
      mainBgSelected: {
        light: "gray.200",
        dark: "gray.700",
      },
      mainBgInactive: {
        light: "gray.300",
        dark: "gray.900",
      },
      mainFont: {
        light: "gray.600",
        dark: "gray.300",
      },
      mainFontSelected: {
        light: "gray.900",
        dark: "gray.50",
      },
      mainFontInactive: {
        light: "gray.500",
        dark: "gray.500",
      },
      mainBorder: {
        light: "rgba(160, 174, 192, .4)",
        dark: "rgba(226, 232, 240, .4)",
      },
      mainDivider: {
        light: "rgba(160, 174, 192, .6)",
        dark: "rgba(226, 232, 240, .6)",
      },
      mainComponentBg: {
        light: "gray.100",
        dark: "gray.800",
      },
      mainCardLeftBg: {
        light: "gray.500",
        dark: "gray.300",
      },
    },
    fonts: {
      ...theme.fonts,
      body: "Montserrat, Roboto, sans-serif",
      heading: "Montserrat, Roboto, sans-serif",
      mono: "Montserrat, Roboto, sans-serif",
    },
  };

  function LoadingPage() {
    return (
      <Flex w="100%" h="100vh" align="center" justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <ChakraProvider theme={customTheme}>
      <React.Suspense fallback={<LoadingPage />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </ChakraProvider>
  );
};
