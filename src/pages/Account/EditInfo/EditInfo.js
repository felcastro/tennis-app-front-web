import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import {
  useTheme,
  useColorMode,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Stack,
  FormErrorMessage,
  FormLabel,
  Select,
  Heading,
  Link,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
  FormHelperText,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

import userService from "../../../services/userService";
import levelService from "../../../services/levelService";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [levels, setLevels] = useState([]);

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
  const watchAllFields = watch(undefined, {
    placesSearchDistance: user.placesSearchDistance,
  });

  async function onSubmit(data, e) {
    setLoading(true);
    e.preventDefault();

    try {
      const updatedUser = await userService.update(user.id, data);
      dispatch({
        type: "UPDATE_USER",
        user: updatedUser,
      });
    } catch (err) {
      if (err.response.status === 400 || err.response.status === 409) {
        err.response.data.errors.forEach((error) => {
          setError(error.path, { type: "manual", message: error.message });
        });
      } else {
        setFormError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadLevels() {
    setLoading(true);
    setLoadError(false);

    try {
      setLevels(await levelService.list());
      if (user.level) {
        setValue("levelId", user.level.id);
        setSelectedLevel(user.level);
      }
    } catch (err) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLevels();
  }, []);

  return (
    <Stack maxW="46rem" px={{ base: 4, md: 0 }} py={3} flex={1}>
      <Box textAlign="left">
        <Link as={RouterLink} to="/account">
          <Stack isInline align="center">
            <Box as={FaArrowLeft} />
            <Box as="span">Voltar</Box>
          </Stack>
        </Link>
      </Box>
      <Flex
        flex={1}
        align="center"
        justifyContent="center"
        display={isLoading ? "flex" : "none"}
      >
        <Spinner size="lg" />
      </Flex>
      <Box display={isLoading || loadError ? "none" : "block"}>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} mt={4}>
          <Flex
            px={4}
            py={2}
            align="center"
            display={formError ? "block" : "none"}
            bg="red.200"
            border="1px solid"
            borderColor="red.400"
            borderRadius=".25em"
          >
            {formError}
          </Flex>
          <Box textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="normal"
            >
              Dados Pessoais
            </Heading>
            <Divider
              orientation="horizontal"
              borderColor={colors.mainDivider[colorMode]}
            />
          </Box>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              name="name"
              placeholder="Informe seu nome"
              defaultValue={user.name}
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
          <FormControl isInvalid={errors.birth}>
            <FormLabel htmlFor="birth">Data de Nascimento</FormLabel>
            <Input
              id="birth"
              name="birth"
              placeholder="Informe sua data de nascimento"
              defaultValue={user.birth}
              type="date"
              ref={register()}
            />
            <FormErrorMessage>
              {errors.birth && errors.birth.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.levelId}>
            <FormLabel htmlFor="levelId">Nível base de jogo</FormLabel>
            <Select
              id="levelId"
              name="levelId"
              isDisabled={isLoading}
              ref={register()}
              onChange={() => {
                setSelectedLevel(
                  levels.find(
                    (level) => level.id === parseInt(getValues("levelId"), 10)
                  )
                );
              }}
            >
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </Select>
            <FormHelperText id="level-helper">
              {selectedLevel?.description}
            </FormHelperText>
            <FormErrorMessage>
              {errors.levelId && errors.levelId.message}
            </FormErrorMessage>
          </FormControl>
          <Box textAlign="center" mt={4}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="normal"
            >
              Configurações
            </Heading>
            <Divider
              orientation="horizontal"
              borderColor={colors.mainDivider[colorMode]}
            />
          </Box>
          <FormControl isInvalid={errors.placesSearchDistance}>
            <FormLabel htmlFor="placesSearchDistance">
              Distância máxima de busca de locais
            </FormLabel>
            <Stack isInline align="center" spacing={4}>
              <Box as="span" minW="15%" whiteSpace="nowrap">
                {`${watchAllFields.placesSearchDistance} km`}
              </Box>
              <Controller
                as={
                  <Slider>
                    <SliderTrack />
                    <SliderFilledTrack />
                    <SliderThumb />
                  </Slider>
                }
                control={control}
                name="placesSearchDistance"
                defaultValue={user.placesSearchDistance}
                min={5}
                max={100}
              />
            </Stack>
            <FormErrorMessage>
              {errors.placesSearchDistance &&
                errors.placesSearchDistance.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="green"
            width="100%"
            mt={4}
          >
            Salvar
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
