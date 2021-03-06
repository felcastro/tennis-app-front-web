import React from "react";
import PropTypes from "prop-types";
import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Divider,
  useColorMode,
  Link,
  useTheme,
  Stack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  FaSearch,
  FaHome,
  FaStar,
  FaCalendarDay,
  FaUsers,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import authService from "../../services/authService";

export default function MainMenu({ onClose }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const MenuListItem = ({ title, icon, to, onClick }) => {
    const location = useLocation();
    const currentPath = `/${location.pathname.split("/")[1]}`;

    return (
      <Link
        as={RouterLink}
        to={to}
        color={currentPath === to ? colors.mainFontSelected[colorMode] : ""}
        onClick={onClick}
        bg={currentPath === to ? colors.mainBgSelected[colorMode] : ""}
        _hover={{
          textDecoration: "none",
          bg: colors.mainBgSelected[colorMode],
        }}
        _focus={{ bg: colors.mainBgSelected[colorMode] }}
        pl={4}
        py={3}
        display="flex"
      >
        <Stack isInline spacing={4} align="center">
          <Box as={icon} fontSize="xl" />
          <Box
            flex={1}
            fontWeight="medium"
            fontSize="sm"
            whiteSpace="nowrap"
            overflowX="hidden"
            textOverflow="ellipsis"
          >
            {title}
          </Box>
        </Stack>
      </Link>
    );
  };

  MenuListItem.defaultProps = {
    onClick: null,
  };

  MenuListItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    authService.signOut();
    dispatch({
      type: "SIGNIN_USER",
      user: null,
      token: null,
    });
  };

  const MenuMainItems = () => {
    const items = [
      { icon: FaHome, to: "/home", title: "Home", onClick: onClose },
      {
        icon: FaSearch,
        to: "/search-match",
        title: "Buscar Partida",
        onClick: onClose,
      },
      {
        icon: FaStar,
        to: "/matches",
        title: "Minhas Partidas",
        onClick: onClose,
      },
      {
        icon: FaCalendarDay,
        to: "/events",
        title: "Eventos",
        onClick: onClose,
      },
      { icon: FaUsers, to: "/players", title: "Jogadores", onClick: onClose },
      {
        icon: FaMapMarkedAlt,
        to: "/places",
        title: "Locais",
        onClick: onClose,
      },
    ];

    return items.map((item) => (
      <MenuListItem
        icon={item.icon}
        to={item.to}
        title={item.title}
        onClick={item.onClick}
      />
    ));
  };

  const MenuAccountItems = () => {
    const items = [
      {
        icon: FaUserCircle,
        to: "/account",
        title: "Minha Conta",
        onClick: onClose,
      },
      { icon: FaSignOutAlt, to: "/", title: "Sair", onClick: onLogoutClick },
    ];

    return items.map((item) => (
      <MenuListItem
        icon={item.icon}
        to={item.to}
        title={item.title}
        onClick={item.onClick}
      />
    ));
  };

  return (
    <Box as="nav">
      <MenuMainItems />
      <Divider
        orientation="horizontal"
        borderColor={colors.mainDivider[colorMode]}
      />
      <MenuAccountItems />
    </Box>
  );
}

MainMenu.defaultProps = {
  onClose: null,
};

MainMenu.propTypes = {
  onClose: PropTypes.func,
};
