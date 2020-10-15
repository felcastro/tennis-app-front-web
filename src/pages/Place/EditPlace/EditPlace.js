import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Stack,
  Flex,
  Spinner,
  Box,
  Image,
  useTheme,
  useColorMode,
  Heading,
  Link,
  AspectRatioBox,
  Divider,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  IconButton,
} from "@chakra-ui/core";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

import placeService from "../../../services/placeService";
import sportService from "../../../services/sportService";

export default function EditPlace() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState(null);
  const [sports, setSports] = useState([]);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const [formError, setFormError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setValue,
    getValues,
    setError,
  } = useForm();

  async function loadPlace() {
    try {
      const data = await placeService.get(id);
      setPlace(data);
    } catch (err) {
      setLoadError(true);
    }
  }

  async function loadSports() {
    try {
      const data = await sportService.list();
      setSports(data);
    } catch (err) {
      setLoadError(true);
    }
  }

  async function loadData() {
    setLoading(true);
    setLoadError(false);
    await Promise.all([loadPlace(), loadSports()]);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function onSubmitPlaceInfo(data, e) {
    console.log(data);
  }

  return (
    <Stack maxW="46rem" flex={1} pb={2}>
      {place && (
        <AspectRatioBox w="100%" ratio={2.5}>
          <Image
            src={place.pictureUrl}
            alt=""
            objectFit="cover"
            h="100%"
            w="100%"
          />
        </AspectRatioBox>
      )}
      <Box textAlign="left">
        <Link as={RouterLink} to={`/places/${place?.id}`}>
          <Stack isInline align="center">
            <Box as={FaArrowLeft} />
            <Box as="span">Voltar</Box>
          </Stack>
        </Link>
      </Box>
      {isLoading && (
        <Flex flex={1} align="center" justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!loadError && place && (
        <Box px={4} mt={2}>
          <Stack
            as="form"
            onSubmit={handleSubmit(onSubmitPlaceInfo)}
            spacing={4}
          >
            <Box textAlign="center">
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="normal"
              >
                Dados do Local
              </Heading>
              <Divider
                orientation="horizontal"
                borderColor={colors.mainDivider[colorMode]}
              />
            </Box>
            {formError && (
              <Flex
                px={4}
                py={2}
                align="center"
                bg="red.200"
                border="1px solid"
                borderColor="red.400"
                borderRadius=".25em"
              >
                {formError}
              </Flex>
            )}
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                id="name"
                name="name"
                placeholder="Informe o nome do local"
                isDisabled={isLoading}
                defaultValue={place.name}
                ref={register({
                  required: "Nome não pode estar em branco",
                  min: {
                    value: 4,
                    message: "Nome deve conter pelo menos 4 caracteres",
                  },
                  max: {
                    value: 100,
                    message: "Nome deve conter até 100 caracteres",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.opensAt}>
              <FormLabel htmlFor="opensAt">Horário de abertura</FormLabel>
              <Input
                id="opensAt"
                name="opensAt"
                placeholder="Informe o horário de abertura"
                type="time"
                isDisabled={isLoading}
                defaultValue={place.opensAt}
                ref={register({
                  required: "Horário de abertura não pode estar em branco",
                })}
              />
              <FormErrorMessage>
                {errors.opensAt && errors.opensAt.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.closesAt}>
              <FormLabel htmlFor="closesAt">Horário de fechamento</FormLabel>
              <Input
                id="closesAt"
                name="closesAt"
                placeholder="Informe o horário de fechamento"
                type="time"
                isDisabled={isLoading}
                defaultValue={place.closesAt}
                ref={register({
                  required: "Horário de fechamento não pode estar em branco",
                })}
              />
              <FormErrorMessage>
                {errors.closesAt && errors.closesAt.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.phone}>
              <FormLabel htmlFor="phone">Telefone</FormLabel>
              <Input
                id="phone"
                name="phone"
                placeholder="Informe o telefone do local"
                isDisabled={isLoading}
                defaultValue={place.phone}
                ref={register()}
              />
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                id="email"
                name="email"
                placeholder="Informe o e-mail do local"
                isDisabled={isLoading}
                defaultValue={place.email}
                ref={register()}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.website}>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                id="website"
                name="website"
                placeholder="Informe o website do local"
                isDisabled={isLoading}
                defaultValue={place.website}
                ref={register()}
              />
              <FormErrorMessage>
                {errors.website && errors.website.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isLoading}
              type="submit"
              variantColor="green"
              width="100%"
              mt={4}
            >
              Salvar
            </Button>
          </Stack>
          <Stack>
            <Box textAlign="center" mt={8}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="normal"
              >
                Quadras
              </Heading>
              <Divider
                orientation="horizontal"
                borderColor={colors.mainDivider[colorMode]}
              />
            </Box>
            <Stack spacing={8}>
              {sports.map((s) => (
                <Box>
                  <Flex justifyContent="space-between" align="center">
                    <Heading as="h2" fontSize="xl">
                      {s.name}
                    </Heading>
                    <IconButton
                      icon={FaPlus}
                      variant="outline"
                      variantColor="green"
                      isRound
                    />
                  </Flex>
                  <Stack mt={4} fontSize="md">
                    <Stack isInline spacing={2} textAlign="center">
                      <Box
                        flex={1}
                        p={2}
                        bg={colors.mainComponentBg[colorMode]}
                      >
                        <Heading as="h3" fontSize="md">
                          Nome
                        </Heading>
                      </Box>
                      <Box
                        flex={1}
                        p={2}
                        bg={colors.mainComponentBg[colorMode]}
                      >
                        <Heading as="h3" fontSize="md">
                          Tipo
                        </Heading>
                      </Box>
                      <Box
                        flex={1}
                        p={2}
                        bg={colors.mainComponentBg[colorMode]}
                      >
                        <Heading as="h3" fontSize="md">
                          Coberta
                        </Heading>
                      </Box>
                    </Stack>
                    {place.courts
                      .filter((c) => c.type.sport.id === s.id)
                      .map((c) => (
                        <Stack isInline spacing={2}>
                          <Box
                            flex={1}
                            p={2}
                            bg={colors.mainComponentBg[colorMode]}
                          >
                            {c.name}
                          </Box>
                          <Box
                            flex={1}
                            p={2}
                            bg={colors.mainComponentBg[colorMode]}
                          >
                            {c.type.name}
                          </Box>
                          <Box
                            flex={1}
                            p={2}
                            bg={colors.mainComponentBg[colorMode]}
                            color={c.isCovered ? "green.400" : "red.400"}
                          >
                            {c.isCovered ? "Sim" : "Não"}
                          </Box>
                        </Stack>
                      ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Box textAlign="center" mt={8}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="normal"
              >
                Cronogramas
              </Heading>
              <Divider
                orientation="horizontal"
                borderColor={colors.mainDivider[colorMode]}
              />
            </Box>
            <Button
              as={RouterLink}
              to={`/places/${place.id}/scheadules/new`}
              variantColor="green"
            >
              Novo Cronograma
            </Button>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
