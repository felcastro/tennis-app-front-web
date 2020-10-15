import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Stack,
  Flex,
  Box,
  useTheme,
  useColorMode,
  Heading,
  Button,
} from "@chakra-ui/core";
import { FaArrowLeft } from "react-icons/fa";

import "../../../components/Calendar/Calendar.css";

export default function Schedules({ place, setPlace }) {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [court, setCourt] = useState();
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const user = useSelector((state) => state.user);

  return (
    <Stack flex={1} px={4} pt={3}>
      <Box textAlign="left">
        <Button onClick={() => setPlace(null)}>
          <Stack isInline align="center">
            <Box as={FaArrowLeft} />
            <Box as="span">Voltar</Box>
          </Stack>
        </Button>
      </Box>
      <Heading as="h2" fontSize="xl">
        Encontramos algumas quadras!
      </Heading>
      <Stack mt={4} fontSize="md" flex={1}>
        <Stack isInline spacing={2} textAlign="center">
          <Box flex={1} p={2} bg={colors.mainComponentBg[colorMode]}>
            <Heading as="h3" fontSize="md">
              Nome
            </Heading>
          </Box>
          <Box flex={1} p={2} bg={colors.mainComponentBg[colorMode]}>
            <Heading as="h3" fontSize="md">
              Tipo
            </Heading>
          </Box>
          <Box flex={1} p={2} bg={colors.mainComponentBg[colorMode]}>
            <Heading as="h3" fontSize="md">
              Coberta
            </Heading>
          </Box>
        </Stack>
        {place.courts
          .filter((c) => c.sport === "Tênis")
          .map((c) => (
            <Stack isInline spacing={2} onClick={() => setCourt(c)}>
              <Box flex={1} p={2} bg={colors.mainComponentBg[colorMode]}>
                {c.name}
              </Box>
              <Box
                flex={1}
                p={2}
                bg={colors.mainComponentBg[colorMode]}
                color={c.type === "Saibro" ? "orange.400" : ""}
              >
                {c.type}
              </Box>
              <Box
                flex={1}
                p={2}
                bg={colors.mainComponentBg[colorMode]}
                color={c.covered ? "green.400" : "red.400"}
              >
                {c.covered ? "Sim" : "Não"}
              </Box>
            </Stack>
          ))}
        {court && <Box mt={2}>{`${court.name} selecionada!`}</Box>}
        <Flex flex={1}>
          <Button
            as={RouterLink}
            isLoading={isLoading}
            isDisabled={court === undefined}
            variantColor="green"
            alignSelf={{ base: "flex-end", md: "auto" }}
            mt={4}
            w="100%"
          >
            Reservar Quadra
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
}

Schedules.propTypes = {
  place: PropTypes.object.isRequired,
  setPlace: PropTypes.func.isRequired,
};
