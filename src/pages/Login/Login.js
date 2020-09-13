import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Link,
} from "@chakra-ui/core";
import { Link as ReachLink } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useDispatch } from "react-redux";

import api from "../../services/api";

export default () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function onClick(event) {
    setLoading(true);
    event.preventDefault();
    const { email, password } = values;
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
        console.log(err);
      });
  }

  return (
    <Box maxW={300} m="1em auto">
      <Image
        m="auto"
        size="48px"
        src={require("../../images/logo192.png")}
        alt=""
      />
      <Heading as="h2" size="lg" textAlign="center" my="4">
        Entrar no TennisApp
      </Heading>
      <ButtonGroup spacing={4} display="flex">
        <Button
          isDisabled={isLoading}
          leftIcon={FaGoogle}
          variantColor="blue"
          variant="outline"
          flex="1 1 0px"
          onClick={onClick}
        >
          Google
        </Button>
        <Button
          isDisabled={isLoading}
          leftIcon={FaFacebook}
          variantColor="blue"
          variant="outline"
          flex="1 1 0px"
          onClick={onClick}
        >
          Facebook
        </Button>
      </ButtonGroup>
      <Flex my="4" align="center" justify="center">
        <Divider orientation="horizontal" />
        <span>ou</span>
        <Divider orientation="horizontal" />
      </Flex>
      <form onSubmit={onClick}>
        <FormControl isRequired mt="4" className="">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="E-mail"
            size="lg"
            onChange={onChange}
            value={values.email}
          />
        </FormControl>
        <FormControl isRequired mt="4" className="">
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            size="lg"
            onChange={onChange}
            value={values.password}
          />
        </FormControl>
        <Button
          isLoading={isLoading}
          type="submit"
          variantColor="green"
          width="100%"
          mt="8"
          //   onClick={onClick}
        >
          Entrar
        </Button>
      </form>
      <Flex mt="4" align="center" justify="center">
        <Link as={ReachLink} to="/register">
          Criar uma conta
        </Link>
        <Divider orientation="vertical" alignSelf="stretch" />
        <Link href="/login">Esqueceu sua senha?</Link>
      </Flex>
    </Box>
  );
}
