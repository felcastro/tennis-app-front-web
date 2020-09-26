import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabList,
  Tab,
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
  AspectRatioBox,
  Divider,
  Button,
} from "@chakra-ui/core";
import { FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";

import mockApi from "../../services/mockApi";

export default function Matches() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState({});
  const [sports, setSports] = useState([]);
  const [courts, setCourts] = useState({});
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const loadPlace = () => {
    setLoading(true);
    setLoadError(false);
    const url = `/api/places/${id}`;

    mockApi
      .get(url, {
        headers: {
          Authorization: user.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPlace(response.data);
        setSports([...new Set(response.data.courts.map((c) => c.sport))]);
        const c = {};
        response.data.courts.forEach((court) => {
          if (c[court.sport]) {
            c[court.sport].total += 1;
            c[court.sport].types[c.type] = c[court.sport].types[c.type]
              ? c[court.sport].types[c.type] + 1
              : 1;
            c[court.sport].covered += court.covered ? 1 : 0;
          } else {
            c[court.sport] = {
              total: 1,
              types: {
                [court.type]: 1,
              },
              covered: court.covered ? 1 : 0,
            };
          }
        });
        console.log(c);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoadError(true);
      });
  };

  useEffect(() => {
    loadPlace();
  }, []);

  const TableCellHeader = ({ value }) => {
    return (
      <Box flex={1} p={2} bg={colors.mainComponentBg[colorMode]}>
        <Heading as="h3" fontSize="md">
          {value}
        </Heading>
      </Box>
    );
  };

  return (
    <Stack maxW="46rem" flex={1} pb={4}>
      <Flex
        flex={1}
        align="center"
        justifyContent="center"
        display={isLoading ? "flex" : "none"}
      >
        <Spinner size="lg" />
      </Flex>
      <Box display={isLoading ? "none" : "block"}>
        <AspectRatioBox w="100%" ratio={2.5}>
          <Image
            src={place.pictureUrl}
            alt=""
            objectFit="cover"
            h="100%"
            w="100%"
          />
        </AspectRatioBox>
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
          <Divider />
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
            <Box bg={colors.mainComponentBg[colorMode]} p={2} borderRadius={6}>
              <Heading as="h2" fontSize="lg">
                Informações
              </Heading>
              <List mt={4} spacing={2}>
                <ListItem>
                  <Stack isInline spacing={2} align="center">
                    <Box as={FaPhone} fontSize="xl" />
                    <Box as="span">{place.phone}</Box>
                  </Stack>
                </ListItem>
                <ListItem>
                  <Stack isInline spacing={2} align="center">
                    <Box as={FaGlobe} fontSize="xl" />
                    <Box as="span">
                      <Link href={place.website} isExternal>
                        {place.website}
                      </Link>
                    </Box>
                  </Stack>
                </ListItem>
                <ListItem>
                  <Stack isInline spacing={2} align="center">
                    <Box as={FaEnvelope} fontSize="xl" />
                    <Box as="span">{place.email}</Box>
                  </Stack>
                </ListItem>
              </List>
            </Box>
            <Box bg={colors.mainComponentBg[colorMode]} p={2} borderRadius={6}>
              <Heading as="h2" fontSize="lg">
                Valores
              </Heading>
              {/* <List mt={4}></List> */}
            </Box>
          </SimpleGrid>
          <Box mt={4}>
            <Heading
              as="h1"
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight="normal"
              textAlign="center"
            >
              Quadras
            </Heading>
            <Divider />
            <Stack spacing={8}>
              {sports.map((s) => (
                <Box>
                  <Flex justifyContent="space-between" align="center">
                    <Heading as="h2" fontSize="xl">
                      {s}
                    </Heading>
                    <Button
                      as={RouterLink}
                      to={`/places/${place.id}/book-court`}
                      variantColor="green"
                    >
                      Reservar Horário
                    </Button>
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
                      .filter((c) => c.sport === s)
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
                  </Stack>
                  {/* <Box as="span">{`${
                      place.courts.filter((c) => c.sport === s).length
                    } quadras`}</Box> */}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
