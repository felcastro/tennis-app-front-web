import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  Stack,
  Flex,
  Box,
  useTheme,
  useColorMode,
  Heading,
  Divider,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

import placeService from "../../../../services/placeService";

export default function PlaceInfoForm({ place, setPlace }) {
  const [isLoading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const [formError, setFormError] = useState(null);
  const { register, handleSubmit, errors, setError } = useForm();

  async function onSubmit(data) {
    setLoading(true);
    try {
      const updatedPlace = await placeService.update(place.id, data);
      setPlace(updatedPlace);
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
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
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
        colorScheme="green"
        width="100%"
        mt={4}
      >
        Salvar
      </Button>
    </Stack>
  );
}

PlaceInfoForm.propTypes = {
  place: PropTypes.object.isRequired,
  setPlace: PropTypes.func.isRequired,
};
