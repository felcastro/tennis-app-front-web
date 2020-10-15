import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useTheme,
  useColorMode,
  Box,
  Heading,
  Stack,
  FormLabel,
  Text,
  Select,
  Avatar,
  PseudoBox,
  List,
  ListItem,
  Switch,
  useDisclosure,
} from "@chakra-ui/core";
import { FaCamera } from "react-icons/fa";

import MenuGroupTitle from "./components/MenuGroupTitle";
import MenuLink from "./components/MenuLink";
import ImageUploader from "../../components/ImageUploader";
import { userService } from "../../services";

export default function Account() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onUpdateImage(data) {
    try {
      const responseData = await userService.updatePicture(user.id, data);

      if (responseData.url) {
        dispatch({
          type: "UPDATE_USER",
          user: { ...user, pictureUrl: `${responseData.url}?t=${Date.now()}` },
        });
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  return (
    <Box maxW="46rem" px={4} py={3} flex={1}>
      <Stack align="center" spacing={4}>
        <Box pos="relative" onClick={onOpen}>
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
        <ImageUploader
          upload={onUpdateImage}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Stack align="center" spacing={0}>
          <Box as="span" fontSize="lg">
            {user.name}
          </Box>
          <Box as="span" fontSize="sm">
            {user.level ? `Level ${user.level.name}` : null}
          </Box>
        </Stack>
      </Stack>
      <List mt={4}>
        <MenuGroupTitle
          title="Configurações do perfil"
          subtitle="Gerencie os dados e preferências do seu perfil."
        />
        <MenuLink
          to="/account/edit-info"
          title="Dados pessoais"
          subtitle="Informe os dados públicos relacionados a você, e suas preferências."
        />
        <MenuGroupTitle
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
        <MenuGroupTitle
          title="Gerenciamento da conta"
          subtitle="Gerencie a sua conta no TennisApp."
        />
        <MenuLink
          to="/account"
          title="Dados privados"
          subtitle="Configure as informações privadas pertinentes a sua conta."
        />
        <MenuLink
          to="/account"
          title="Deletar conta"
          subtitle="Caso desejar, exclua sua conta permanentemente."
        />
      </List>
    </Box>
  );
}
