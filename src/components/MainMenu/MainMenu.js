import React, { useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Divider,
  useColorMode,
  Link,
  useTheme,
  Stack,
  PseudoBox,
} from "@chakra-ui/core";
import { useDispatch } from "react-redux";
import {
  FaSearch,
  FaHome,
  FaStar,
  FaCalendarDay,
  FaUsers,
  FaMapMarkedAlt,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

export default () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const MenuListItem = (props = {}) => {
    const location = useLocation();
    const currentPath = `/${location.pathname.split("/")[1]}`;

    return (
      <Link
        as={RouterLink}
        to={props.to}
        color={
          currentPath === props.to ? colors.mainFontSelected[colorMode] : ""
        }
        onClick={props.onClick}
        bg={currentPath === props.to ? colors.mainBgSelected[colorMode] : ""}
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
          <Box as={props.icon} fontSize="xl" />
          <Box
            flex={1}
            fontWeight="medium"
            fontSize="sm"
            whiteSpace="nowrap"
            overflowX="hidden"
            textOverflow="ellipsis"
          >
            {props.title}
          </Box>
        </Stack>
      </Link>
    );
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("user-data");
    dispatch({
      type: "SIGNIN_USER",
      user: null,
    });
  };

  return (
    <Box as="nav">
      <MenuListItem icon={FaHome} to="/home" title="Home" />
      <MenuListItem icon={FaSearch} to="/search-match" title="Buscar Partida" />
      <MenuListItem icon={FaStar} to="/matches" title="Minhas Partidas" />
      <MenuListItem icon={FaCalendarDay} to="/events" title="Eventos" />
      <MenuListItem icon={FaUsers} to="/players" title="Jogadores" />
      <MenuListItem icon={FaMapMarkedAlt} to="/places" title="Locais" />
      <Divider
        orientation="horizontal"
        borderColor={colors.mainDivider[colorMode]}
      />
      <MenuListItem icon={FaUserCircle} to="/account" title="Minha Conta" />
      {/* <MenuListItem icon={FaCog} to="/configuration" title="Configurações" /> */}
      <MenuListItem
        icon={FaSignOutAlt}
        to="/"
        title="Sair"
        onClick={onLogoutClick}
      />
    </Box>
  );
};
