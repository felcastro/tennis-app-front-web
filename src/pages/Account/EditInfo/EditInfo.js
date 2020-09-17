import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
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
} from "@chakra-ui/core";
import { FaArrowLeft } from "react-icons/fa";

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const user = useSelector((state) => state.user);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data, e) => {
    setLoading(true);
    console.log(data)
    e.preventDefault();
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

  return (
    <Box maxW="46rem" px={4} py={3} flex={1}>
      <Box textAlign="left">
        <Link as={RouterLink} to="/account">
          <Stack isInline align="center">
            <Box as={FaArrowLeft}></Box>
            <Box as="span">Voltar</Box>
          </Stack>
        </Link>
      </Box>
      <Box textAlign="center" mt={4}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="normal"
        >
          Dados Pessoais
        </Heading>
      </Box>
      <Divider
        orientation="horizontal"
        borderColor={colors.mainDivider[colorMode]}
      />
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
                value: 6,
                message: "Nome deve conter pelo menos 6 caracteres",
              },
              max: {
                value: 255,
                message: "Nome deve conter até 255 caracteres",
              },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.dateOfBirth}>
          <FormLabel htmlFor="dateOfBirth">Data de Nascimento</FormLabel>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Informe sua data de nascimento"
            defaultValue={new Date(user.dateOfBirth)
              .toISOString()
              .substr(0, 10)}
            type="date"
            ref={register()}
          />
          <FormErrorMessage>
            {errors.dateOfBirth && errors.dateOfBirth.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.height}>
          <FormLabel htmlFor="height">Altura (cm)</FormLabel>
          <Input
            id="height"
            name="height"
            type="number"
            placeholder="Informe sua altura"
            defaultValue={user.height}
            ref={register({
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Informe um número inteiro",
              },
              min: { value: 1, message: "Valor baixo demais" },
              max: { value: 250, message: "Valor alto demais" },
            })}
          />
          <FormErrorMessage>
            {errors.height && errors.height.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.weight}>
          <FormLabel htmlFor="weight">Peso (kg)</FormLabel>
          <Input
            id="weight"
            name="weight"
            type="number"
            placeholder="Informe seu peso"
            defaultValue={user.weight}
            ref={register({
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Informe um número inteiro",
              },
              min: { value: 1, message: "Valor baixo demais" },
              max: { value: 1000, message: "Valor alto demais" },
            })}
          />
          <FormErrorMessage>
            {errors.weight && errors.weight.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.laterality}>
          <FormLabel htmlFor="laterality">Lateralidade</FormLabel>
          <Select
            id="laterality"
            name="laterality"
            placeholder="Informe sua lateralidade"
            defaultValue={user.laterality}
          >
            <option value="Destro">Destro</option>
            <option value="Canhoto">Canhoto</option>
          </Select>
          <FormErrorMessage>
            {errors.laterality && errors.laterality.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.backhand}>
          <FormLabel htmlFor="backhand">Backhand</FormLabel>
          <Select
            id="backhand"
            name="backhand"
            placeholder="Informe seu backhand"
            defaultValue={user.backhand}
          >
            <option value="Uma mão">Uma mão</option>
            <option value="Duas mãos">Duas mãos</option>
          </Select>
          <FormErrorMessage>
            {errors.backhand && errors.backhand.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.court}>
          <FormLabel htmlFor="court">Quadra favorita</FormLabel>
          <Select
            id="court"
            name="court"
            placeholder="Informe sua quadra favorita"
            defaultValue={user.court}
          >
            <option value="Saibro">Saibro</option>
            <option value="Rápida">Rápida</option>
            <option value="Sem preferência">Sem preferência</option>
          </Select>
          <FormErrorMessage>
            {errors.court && errors.court.message}
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
    </Box>
  );
};
