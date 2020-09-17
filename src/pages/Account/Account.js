import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import {
  useTheme,
  useColorMode,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  FormErrorMessage,
  FormLabel,
  Text,
  Select,
  Avatar,
  PseudoBox,
  Link,
  List,
  ListItem,
  Switch,
} from "@chakra-ui/core";
import { FaCamera } from "react-icons/fa";

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const user = useSelector((state) => state.user);
  const { colors } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    // event.preventDefault();
    // const { email, password } = data;
    // api
    //   .post("/auth/login", { email, password })
    //   .then((response) => {
    //     const user = {
    //       ...response.data,
    //       token: response.headers.authorization,
    //     };
    //     localStorage.setItem("user-data", JSON.stringify(user));
    //     dispatch({
    //       type: "SIGNIN_USER",
    //       user,
    //     });
    //   })
    //   .then(() => {
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     err.response.data.error
    //       ? setFormError(err.response.data.error.message)
    //       : setFormError("Ocorreu um erro inexperado, tente novamente");
    //   });
  };

  const MenuListLink = (props = {}) => {
    return (
      <ListItem
        borderBottom="1px solid"
        borderColor={colors.mainBorder[colorMode]}
      >
        <Link
          as={RouterLink}
          to={props.to}
          py={4}
          _hover={{
            bg: colors.mainBgSelected[colorMode],
            textDecoration: "none",
          }}
          _focus={{ bg: colors.mainBgSelected[colorMode] }}
          display="block"
        >
          <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
            {props.title}
          </Heading>
          <Text as="p" lineHeight="none" fontSize="sm">
            {props.subtitle}
          </Text>
        </Link>
      </ListItem>
    );
  };

  const MenuListTitle = (props = {}) => {
    return (
      <ListItem
        py={2}
        mt={6}
        borderBottom="1px solid"
        borderColor={colors.mainBorder[colorMode]}
      >
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="normal"
        >
          {props.title}
        </Heading>
        <Text as="p" lineHeight="none" fontSize="sm">
          {props.subtitle}
        </Text>
      </ListItem>
    );
  };

  return (
    <Box maxW="46rem" px={4} py={3} flex={1}>
      <Stack align="center" spacing={4}>
        <Box pos="relative">
          <Avatar
            size="2xl"
            style={{ objectFit: "fill !important" }}
            src={user.pictureUrl}
            name={user.name}
          />
          <PseudoBox
            pos="absolute"
            h="100%"
            w="100%"
            top={0}
            left={0}
            right={0}
            bottom={0}
            borderRadius="9999px"
            bg="gray.900"
            opacity="0"
            cursor="pointer"
            _hover={{ opacity: ".6" }}
          >
            <Box as={FaCamera} margin="50% auto" opacity="1" fontSize="xl" />
          </PseudoBox>
        </Box>
        <Stack align="center" spacing={0}>
          <Box as="span" fontSize="lg">
            {user.name}
          </Box>
          <Box as="span" fontSize="sm">
            Level {user.level}
          </Box>
        </Stack>
      </Stack>
      <List mt={4}>
        <MenuListTitle
          title="Informações do perfil"
          subtitle="Gerencie os dados do seu perfil."
        />
        <MenuListLink
          to="/account/edit-info"
          title="Dados pessoais"
          subtitle="Informe os dados relacionados a você, que serão visíveis a outros
          jogadores."
        />
        <MenuListTitle
          title="Preferencias do site"
          subtitle="Controle a forma como você experiencia esta plataforma."
        />
        <ListItem
          py={4}
          borderBottom="1px solid"
          borderColor={colors.mainBorder[colorMode]}
          onClick={toggleColorMode}
          cursor="pointer"
        >
          <Stack isInline align="center" justify="space-between">
            <Box>
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
                Tema de cores
              </Heading>
              <Text as="p" lineHeight="none" fontSize="sm">
                Selecione entre o tema de cores claro ou escuro.
              </Text>
            </Box>
            <Stack isInline>
              <FormLabel htmlFor="selectedColorMode">
                {colorMode === "dark" ? "Escuro" : "Claro"}
              </FormLabel>
              <Switch
                id="selectedColorMode"
                size="lg"
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
            </Stack>
          </Stack>
        </ListItem>
        <ListItem
          py={4}
          borderBottom="1px solid"
          borderColor={colors.mainBorder[colorMode]}
        >
          <Stack isInline spacing={4} align="center">
            <Box width="100%">
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
                Idioma
              </Heading>
              <Text as="p" lineHeight="none" fontSize="sm">
                Selecione o idioma de preferência para o TennisApp.
              </Text>
            </Box>
            <Select>
              <option value={0}>Português</option>
            </Select>
          </Stack>
        </ListItem>
        <MenuListTitle
          title="Gerenciamento da conta"
          subtitle="Gerencie a sua conta no TennisApp."
        />
        <MenuListLink
          to="/account/private-info"
          title="Dados da conta"
          subtitle="Configure as informações privadas pertinentes a sua conta."
        />
        <MenuListLink
          to="/account/search-preferences"
          title="Preferências de busca"
          subtitle="Configure como o TennisApp vai encontrar jogadores e locais para você."
        />
        <MenuListLink
          to="/account/delete-account"
          title="Deletar conta"
          subtitle="Caso desejar, exclua sua conta permanentemente."
        />
      </List>
    </Box>
  );
};
