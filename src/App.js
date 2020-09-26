import React from "react";
import { Spinner, theme, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import { useSelector } from "react-redux";
import { ThemeProvider } from "emotion-theming";

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
      mainFont: {
        light: "gray.600",
        dark: "gray.300",
      },
      mainFontSelected: {
        light: "gray.900",
        dark: "gray.50",
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

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <React.Suspense fallback={<Spinner />}>
        {user ? (
          <ColorModeProvider>
            <AuthenticatedApp />
          </ColorModeProvider>
        ) : (
          <UnauthenticatedApp />
        )}
      </React.Suspense>
    </ThemeProvider>
  );
};
