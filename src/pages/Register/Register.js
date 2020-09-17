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
import { IoIosTennisball } from "react-icons/io";

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
    <Box maxW={{base: "auto", sm: "18rem"}} mt={4} mx={{base: 4, sm: "auto"}}>
      <Box as={IoIosTennisball} size="2.5rem" mr={1} mx="auto" color="#c9f364"/>
      <Heading as="h2" size="md" textAlign="center" my={4}>
        Criar conta
      </Heading>
      <Box as="form" onSubmit="">
        <FormControl my={4}>
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
        <FormControl mt={4}>
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
        <FormControl mt={4}>
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
        <Button type="submit" variantColor="green" width="100%" mt={8}>
          Criar conta
        </Button>
      </Box>
      <Box mt={4} fontSize="sm" textAlign="center">
        <Link as={ReachLink} to="/login">
          Acessar conta existente
        </Link>
      </Box>
    </Box>
  );
};
