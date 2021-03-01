import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Stack,
  ListItem,
  Flex,
  Spinner,
  List,
  SimpleGrid,
  Box,
  Image,
  useTheme,
  useColorMode,
  Heading,
  Link,
  AspectRatio,
  Divider,
  Button,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaClock,
  FaStopwatch,
} from "react-icons/fa";

import placeService from "../../services/placeService";

export default function Place() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState({});
  const [sports, setSports] = useState([]);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  async function loadPlace() {
    setLoading(true);
    setLoadError(false);

    try {
      const data = await placeService.get(id);
      setPlace(data);
      setSports([...new Set(data.courts.map((c) => c.type.sport.name))]);
    } catch (err) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlace();
  }, []);

  return (
    <Flex maxW="46rem" flex={1} pb={4} flexDirection="column">
      {isLoading && (
        <Flex flex={1} align="center" justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!isLoading && !loadError && (
        <>
          <AspectRatio w="100%" ratio={2.5}>
            <Image
              src={place.pictureUrl}
              alt=""
              objectFit="cover"
              h="100%"
              w="100%"
            />
          </AspectRatio>
          <Box mt={2} px={4}>
            <Box textAlign="center" lineHeight="none">
              <Heading
                as="h1"
                fontSize={{ base: "lg", md: "2xl" }}
                fontWeight="normal"
              >
                {place.name}
              </Heading>
              <Box as="span" fontSize={{ base: "xs", md: "sm" }}>
                {place.address}
              </Box>
            </Box>
            <Divider my={2} />
            {place.admins?.some((u) => u.id === user.id) && (
              <Flex justifyContent="flex-end">
                <Button
                  as={RouterLink}
                  to={`/places/${place.id}/edit`}
                  colorScheme="yellow"
                >
                  Editar
                </Button>
              </Flex>
            )}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mt={2}>
              <Box
                bg={colors.mainComponentBg[colorMode]}
                p={2}
                borderRadius={6}
                overflowWrap="anywhere"
              >
                <Heading as="h2" fontSize="lg">
                  Informações
                </Heading>
                <List mt={2} spacing={1} fontSize="sm">
                  {place.phone && (
                    <ListItem>
                      <Stack isInline spacing={2} align="center">
                        <Box as={FaPhone} />
                        <Box as="span">{place.phone}</Box>
                      </Stack>
                    </ListItem>
                  )}
                  {place.website && (
                    <ListItem>
                      <Stack isInline spacing={2} align="center">
                        <Box as={FaGlobe} />
                        <Box as="span">
                          <Link href={place.website} isExternal>
                            {place.website}
                          </Link>
                        </Box>
                      </Stack>
                    </ListItem>
                  )}
                  {place.email && (
                    <ListItem>
                      <Stack isInline spacing={2} align="center">
                        <Box as={FaEnvelope} />
                        <Box as="span">{place.email}</Box>
                      </Stack>
                    </ListItem>
                  )}
                </List>
              </Box>
              <Box
                bg={colors.mainComponentBg[colorMode]}
                p={2}
                borderRadius={6}
              >
                <Heading as="h2" fontSize="lg">
                  Funcionamento
                </Heading>
                <List mt={2} spacing={1} fontSize="sm">
                  {place.opensAt && place.closesAt && (
                    <ListItem>
                      <Stack isInline spacing={2} align="center">
                        <Box as={FaClock} />
                        <Box as="span">{`${place.opensAt} - ${place.closesAt}`}</Box>
                      </Stack>
                    </ListItem>
                  )}
                  {place.rentTime && (
                    <ListItem>
                      <Stack isInline spacing={2} align="center">
                        <Box as={FaStopwatch} />
                        <Box as="span">{`Tempo de quadra: ${place.rentTime} minutos`}</Box>
                      </Stack>
                    </ListItem>
                  )}
                </List>
              </Box>
            </SimpleGrid>
            {sports.length > 0 && (
              <Box mt={8}>
                <Flex justifyContent="space-between" align="center">
                  <Heading
                    as="h1"
                    fontSize={{ base: "lg", md: "2xl" }}
                    fontWeight="normal"
                    textAlign="center"
                  >
                    Quadras
                  </Heading>
                  <Button
                    as={RouterLink}
                    to={`/places/${place.id}/book-court`}
                    colorScheme="green"
                  >
                    Reservar Horário
                  </Button>
                </Flex>
                <Divider my={2} />
                <Stack spacing={8}>
                  {sports.map((s) => (
                    <Box>
                      <Heading as="h2" fontSize="xl">
                        {s}
                      </Heading>
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
                          .filter((c) => c.type.sport.name === s)
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
              </Box>
            )}
          </Box>
        </>
      )}
    </Flex>
  );
}
