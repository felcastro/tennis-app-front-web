import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { differenceInMinutes, addMinutes, format } from "date-fns";
import {
  Stack,
  Flex,
  Spinner,
  Box,
  useTheme,
  useColorMode,
  Link,
} from "@chakra-ui/core";
import { FaArrowLeft } from "react-icons/fa";

import placeService from "../../../services/placeService";

export default function EditScheadule() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState(null);
  const [scheadule, setScheadule] = useState(null);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { id, scheaduleId } = useParams();
  const weekDays = [
    { id: 1, name: "Segunda Feira" },
    { id: 2, name: "Terça Feira" },
    { id: 3, name: "Quarta Feira" },
    { id: 4, name: "Quinta Feira" },
    { id: 5, name: "Sexta Feira" },
    { id: 6, name: "Sábado" },
    { id: 0, name: "Domingo" },
  ];

  function loadScheadule(data) {
    const t1 = data.opensAt.split(":");
    const t2 = data.closesAt.split(":");
    const d1 = new Date(0, 0, 0, t1[0], t1[1]);
    const d2 = new Date(0, 0, 0, t2[0], t2[1]);
    const diff = differenceInMinutes(d2, d1);

    const schd = {
      name: "teste",
      description: "desc teste",
      timeSlots: [],
    };
    for (let i = 0; i < 7; i += 1) {
      for (let j = 0; j <= diff; j += data.rentTime) {
        const date = addMinutes(d1, j);
        schd.timeSlots.push({
          weekDay: i,
          time: format(date, "HH:mm"),
          price: 10,
        });
      }
    }
    setScheadule(schd);
  }

  async function loadPlace() {
    setLoading(true);
    setLoadError(false);
    try {
      const data = await placeService.get(id);
      setPlace(data);
      loadScheadule(data);
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
    <Stack flex={1} px={4} py={3}>
      <Box textAlign="left">
        <Link as={RouterLink} to={`/places/${place?.id}/edit`}>
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
      {!isLoading && !loadError && place && scheadule && (
        <Stack isInline spacing={2} flex={1}>
          {weekDays.map((wd) => (
            <Stack flex={1}>
              <Box
                p={2}
                textAlign="center"
                bg={colors.mainComponentBg[colorMode]}
              >
                {wd.name}
              </Box>
              {scheadule.timeSlots
                .filter((s) => s.weekDay === wd.id)
                .map((s) => (
                  <Flex
                    flex={1}
                    justifyContent="space-between"
                    p={2}
                    bg={colors.mainComponentBg[colorMode]}
                  >
                    <Box as="span">{s.time}</Box>
                    <Box as="span">{`R$ ${s.price.toFixed(2)}`}</Box>
                  </Flex>
                ))}
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
