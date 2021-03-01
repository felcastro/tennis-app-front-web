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
  AspectRatio,
  Divider,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaArrowLeft, FaPlus, FaCamera } from "react-icons/fa";

import placeService from "../../../services/placeService";
import sportService from "../../../services/sportService";
import PlaceInfoForm from "./PlaceInfoForm";
import ImageUploader from "../../../components/ImageUploader";

export default function EditPlace() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState(null);
  const [sports, setSports] = useState([]);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  async function onUpdateImage(data) {
    try {
      const responseData = await placeService.updatePicture(id, data);

      if (responseData.url) {
        setPlace({ ...place, pictureUrl: responseData.url });
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  return (
    <Stack maxW="46rem" flex={1} pb={2}>
      {place && (
        <>
          <AspectRatio w="100%" ratio={2.5} pos="relative" onClick={onOpen}>
            <Box>
              <Image
                src={place.pictureUrl}
                alt=""
                objectFit="cover"
                h="100%"
                w="100%"
              />
              <Box
                pos="absolute"
                h="100%"
                w="100%"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="gray.900"
                opacity="0"
                cursor="pointer"
                _hover={{ opacity: ".6" }}
              >
                <Flex align="center" justifyContent="center" height="100%">
                  <Box
                    as={FaCamera}
                    opacity="1"
                    fontSize={{ base: "xl", md: "6xl" }}
                  />
                </Flex>
              </Box>
            </Box>
          </AspectRatio>
          <ImageUploader
            upload={onUpdateImage}
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
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
          <PlaceInfoForm place={place} setPlace={setPlace} />
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
                      aria-label="Adicionar quadra"
                      icon={<FaPlus />}
                      variant="outline"
                      colorScheme="green"
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
              colorScheme="green"
            >
              Novo Cronograma
            </Button>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
