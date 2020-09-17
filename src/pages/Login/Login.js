import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Link as ReachLink } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { useDispatch } from "react-redux";

import api from "../../services/api";

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    // event.preventDefault();
    const { email, password } = data;
    api
      .post("/auth/login", { email, password })
      .then((response) => {
        const user = {
          ...response.data,
          token: response.headers.authorization,
        };
        localStorage.setItem("user-data", JSON.stringify(user));
        dispatch({
          type: "SIGNIN_USER",
          user,
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        err.response.data.error
          ? setFormError(err.response.data.error.message)
          : setFormError("Ocorreu um erro inexperado, tente novamente");
      });
  };

  return (
    <Box
      maxW={{ base: "auto", sm: "18rem" }}
      mt={4}
      mx={{ base: 4, sm: "auto" }}
    >
      <Box
        as={IoIosTennisball}
        size="2.5rem"
        mr={1}
        mx="auto"
        color="#c9f364"
      />
      <Heading as="h2" size="md" textAlign="center" py="4">
        Entrar no TennisApp
      </Heading>
      <Stack isInline spacing={4}>
        <Button
          isDisabled={isLoading}
          leftIcon={FaGoogle}
          variantColor="blue"
          variant="outline"
          flex="1 1 0px"
        >
          Google
        </Button>
        <Button
          isDisabled={isLoading}
          leftIcon={FaFacebook}
          variantColor="blue"
          variant="outline"
          flex="1 1 0px"
        >
          Facebook
        </Button>
      </Stack>
      <Stack isInline py={4} align="center" justify="center" spacing={2}>
        <Divider orientation="horizontal" flex={1} m={0} />
        <Box as="span">ou</Box>
        <Divider orientation="horizontal" flex={1} m={0} />
      </Stack>
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
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
        <FormControl isInvalid={errors.email}>
          <Input
            id="email"
            name="email"
            placeholder="E-mail"
            size="lg"
            ref={register({
              required: "E-mail não pode estar em branco",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Informe um e-mail válido",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            size="lg"
            ref={register({
              required: "Senha não pode estar em branco",
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoading}
          type="submit"
          variantColor="green"
          width="100%"
          mt={4}
        >
          Entrar
        </Button>
      </Stack>
      <Flex mt={4} align="center" justify="center" fontSize="sm">
        <Link as={ReachLink} to="/register">
          Criar uma conta
        </Link>
        <Divider orientation="vertical" alignSelf="stretch" />
        <Link href="/login">Esqueceu sua senha?</Link>
      </Flex>
    </Box>
  );
};
