import React, { useState } from "react";
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
} from "@chakra-ui/core";
import { FaArrowLeft } from "react-icons/fa";

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const user = useSelector((state) => state.user);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const watchAllFields = watch(undefined, {
    playersSearchDistance: user.playersSearchDistance,
    placesSearchDistance: user.placesSearchDistance,
    level: user.level,
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
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
          Preferências de busca
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
        <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
          Distância máxima de busca (km)
        </Heading>
        <FormControl isInvalid={errors.playersSearchDistance}>
          <FormLabel htmlFor="playersSearchDistance">Jogadores</FormLabel>
          <Stack isInline align="center" spacing={4}>
            <Box as="span" minW="15%" whiteSpace="nowrap">{watchAllFields.playersSearchDistance} km</Box>
            <Controller
              as={
                <Slider>
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb />
                </Slider>
              }
              control={control}
              name="playersSearchDistance"
              defaultValue={user.playersSearchDistance}
              min={5}
              max={100}
            />
          </Stack>
          <FormErrorMessage>
            {errors.playersSearchDistance &&
              errors.playersSearchDistance.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.placesSearchDistance}>
          <FormLabel htmlFor="placesSearchDistance">Locais</FormLabel>
          <Stack isInline align="center" spacing={4}>
            <Box as="span" minW="15%" whiteSpace="nowrap">{watchAllFields.placesSearchDistance} km</Box>
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
            {errors.placesSearchDistance && errors.placesSearchDistance.message}
          </FormErrorMessage>
        </FormControl>
        <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
          Nível base de jogo
        </Heading>
        <FormControl isInvalid={errors.level}>
          <FormLabel htmlFor="level">Nível</FormLabel>
          <Stack isInline align="center" spacing={4}>
            <Box as="span" minW="15%" whiteSpace="nowrap">{watchAllFields.level}</Box>
            <Controller
              as={
                <Slider>
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb />
                </Slider>
              }
              control={control}
              name="level"
              defaultValue={user.level}
              min={1.5}
              max={5.5}
              step={0.5}
            />
          </Stack>
          <FormErrorMessage>
            {errors.placesSearchDistance && errors.placesSearchDistance.message}
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
