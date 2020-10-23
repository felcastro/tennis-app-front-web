import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Stack,
  Flex,
  Spinner,
  Box,
  Image,
  useTheme,
  useColorMode,
  Heading,
  Link,
  AspectRatioBox,
  Divider,
  Button,
  IconButton,
} from "@chakra-ui/core";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

import placeService from "../../../services/placeService";
import sportService from "../../../services/sportService";
import PlaceInfoForm from "./PlaceInfoForm";

export default function EditPlace() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState(null);
  const [sports, setSports] = useState([]);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { id } = useParams();

  async function loadPlace() {
    try {
      const data = await placeService.get(id);
      setPlace(data);
    } catch (err) {
      setLoadError(true);
    }
  }

  async function loadSports() {
    try {
      const data = await sportService.list();
      setSports(data);
    } catch (err) {
      setLoadError(true);
    }
  }

  async function loadData() {
    setLoading(true);
    setLoadError(false);
    await Promise.all([loadPlace(), loadSports()]);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Stack maxW="46rem" flex={1} pb={2}>
      {place && (
        <AspectRatioBox w="100%" ratio={2.5}>
          <Image
            src={place.pictureUrl}
            alt=""
            objectFit="cover"
            h="100%"
            w="100%"
          />
        </AspectRatioBox>
      )}
      <Box textAlign="left">
        <Link as={RouterLink} to={`/places/${place?.id}`}>
          <Stack isInline align="center">
            <Box as={FaArrowLeft} />
            <Box as="span">Voltar</Box>
          </Stack>
        </Link>
      </Box>
      {isLoading && (
        <Flex flex={1} align="center" justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!loadError && place && (
        <Box px={4} mt={2}>
          <PlaceInfoForm place={place} />
          <Stack>
            <Box textAlign="center" mt={8}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="normal"
              >
                Quadras
              </Heading>
              <Divider
                orientation="horizontal"
                borderColor={colors.mainDivider[colorMode]}
              />
            </Box>
            <Stack spacing={8}>
              {sports.map((s) => (
                <Box>
                  <Flex justifyContent="space-between" align="center">
                    <Heading as="h2" fontSize="xl">
                      {s.name}
                    </Heading>
                    <IconButton
                      icon={FaPlus}
                      variant="outline"
                      variantColor="green"
                      isRound
                    />
                  </Flex>
                  <Stack mt={4} fontSize="md">
                    <Stack isInline spacing={2} textAlign="center">
                      <Box
                        flex={1}
                        p={2}
                        bg={colors.mainComponentBg[colorMode]}
                      >
                        <Heading as="h3" fontSize="md">
                          Nome
                        </Heading>
                      </Box>
                      <Box
                        flex={1}
                        p={2}
                        bg={colors.mainComponentBg[colorMode]}
                      >
                        <Heading as="h3" fontSize="md">
                          Tipo
                        </Heading>
                      </Box>
                      <Box
                        flex={1}
                        p={2}
                        bg={colors.mainComponentBg[colorMode]}
                      >
                        <Heading as="h3" fontSize="md">
                          Coberta
                        </Heading>
                      </Box>
                    </Stack>
                    {place.courts
                      .filter((c) => c.type.sport.id === s.id)
                      .map((c) => (
                        <Stack isInline spacing={2}>
                          <Box
                            flex={1}
                            p={2}
                            bg={colors.mainComponentBg[colorMode]}
                          >
                            {c.name}
                          </Box>
                          <Box
                            flex={1}
                            p={2}
                            bg={colors.mainComponentBg[colorMode]}
                          >
                            {c.type.name}
                          </Box>
                          <Box
                            flex={1}
                            p={2}
                            bg={colors.mainComponentBg[colorMode]}
                            color={c.isCovered ? "green.400" : "red.400"}
                          >
                            {c.isCovered ? "Sim" : "Não"}
                          </Box>
                        </Stack>
                      ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Box textAlign="center" mt={8}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="normal"
              >
                Cronogramas
              </Heading>
              <Divider
                orientation="horizontal"
                borderColor={colors.mainDivider[colorMode]}
              />
            </Box>
            <Button
              as={RouterLink}
              to={`/places/${place.id}/scheadules/new`}
              variantColor="green"
            >
              Novo Cronograma
            </Button>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
