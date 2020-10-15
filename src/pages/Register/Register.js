import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  Heading,
  FormErrorMessage,
  Input,
  Link,
  Stack,
  Flex,
} from "@chakra-ui/core";
import { Link as ReachLink } from "react-router-dom";
import { IoIosTennisball } from "react-icons/io";
import { useDispatch } from "react-redux";

import authService from "../../services/authService";

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setError, getValues } = useForm();

  async function onSubmit(data, e) {
    setLoading(true);
    e.preventDefault();

    try {
      const { user, token } = await authService.signUp(data);
      dispatch({
        type: "SIGNIN_USER",
        user,
        token,
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
      <Heading as="h2" size="md" textAlign="center" my={4}>
        Criar conta
      </Heading>
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
        <FormControl isInvalid={errors.name}>
          <Input
            id="name"
            name="name"
            placeholder="Nome"
            size="lg"
            ref={register({
              required: "Nome não pode estar em branco",
              minLength: {
                value: 4,
                message: "Nome deve conter pelo menos 4 caracteres",
              },
              maxLength: {
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
          <Input
            id="birth"
            name="birth"
            placeholder="Data de nascimento"
            size="lg"
            type="text"
            onFocus={(e) => {
              e.target.type = "date";
            }}
            onBlur={(e) => {
              e.target.type = getValues("birth").length === 0 ? "text" : "date";
            }}
            ref={register({
              required: "Data de nascimento não pode estar em branco",
            })}
          />
          <FormErrorMessage>
            {errors.birth && errors.birth.message}
          </FormErrorMessage>
        </FormControl>
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
            placeholder="Senha"
            size="lg"
            ref={register({
              required: "Senha não pode estar em branco",
              minLength: {
                value: 6,
                message: "Senha deve conter pelo menos 6 caracteres",
              },
              maxLength: {
                value: 100,
                message: "Senha deve conter até 100 caracteres",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          isLoading={isLoading}
          variantColor="green"
          width="100%"
          mt={4}
        >
          Criar conta
        </Button>
      </Stack>
      <Box mt={4} fontSize="sm" textAlign="center">
        <Link as={ReachLink} to="/login">
          Acessar conta existente
        </Link>
      </Box>
    </Box>
  );
};
