import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Input,
  Link,
} from "@chakra-ui/core";
import { Link as ReachLink } from "react-router-dom";

import api from "../../services/api";

export default () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <Box maxW={300} m="1em auto" textAlign="center">
      <Image
        m="auto"
        size="48px"
        src={require("../../images/logo192.png")}
        alt=""
      />
      <Heading as="h2" size="lg" textAlign="center" my="4">
        Criar conta
      </Heading>
      <form onSubmit="">
        <FormControl my="4" className="">
          <Input
            id="name"
            type="name"
            name="name"
            placeholder="Nome Completo"
            size="lg"
            onChange={onChange}
            value={values.name}
          />
        </FormControl>
        <FormControl mt="4" className="">
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
        <FormControl mt="4" className="">
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
        <Button type="submit" variantColor="green" width="100%" mt="4">
          Criar conta
        </Button>
      </form>
      <Box mt="4">
        <Link as={ReachLink} to="/login">
          Acessar conta existente
        </Link>
      </Box>
    </Box>
  );
};
