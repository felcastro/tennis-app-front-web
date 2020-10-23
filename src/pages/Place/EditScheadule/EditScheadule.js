import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { differenceInMinutes, addMinutes, format } from "date-fns";
import {
  Stack,
  Flex,
  Spinner,
  Box,
  Link,
  SimpleGrid,
  Input,
  Button,
  useDisclosure,
  useTheme,
  useColorMode,
} from "@chakra-ui/core";
import { FaArrowLeft } from "react-icons/fa";

import placeService from "../../../services/placeService";
import EditTimeSlotModal from "./EditTimeSlotModal";
import TimeSlot from "./TimeSlot";

export default function EditScheadule() {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState(null);
  const [scheadule, setScheadule] = useState(null);
  const { id, scheaduleId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMouseDown, setMouseDown] = useState(false);
  const [isMouseSelecting, setMouseSelecting] = useState(false);

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
      name: "Cronograma Teste",
      description: "",
      timeSlots: [],
    };
    let index = 0;
    for (let i = 0; i < 7; i += 1) {
      for (let j = 0; j <= diff; j += data.rentTime) {
        const date = addMinutes(d1, j);
        schd.timeSlots.push({
          id: index,
          weekDay: i,
          time: format(date, "HH:mm"),
          price: 0,
          selected: false,
          active: true,
        });
        index += 1;
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

  function onUpdateSelected(data) {
    const { price, isActive } = data;
    const newTimeSlots = [...scheadule.timeSlots];
    newTimeSlots.forEach((ts) => {
      if (ts.selected) {
        const timeSlot = ts;
        timeSlot.price = price;
        timeSlot.active = isActive;
        timeSlot.selected = false;
      }
    });
    setScheadule({ ...scheadule, timeSlots: newTimeSlots });
    onClose();
  }

  return (
    <Stack flex={1} px={4} py={3}>
      <Link
        as={RouterLink}
        to={`/places/${place?.id}/edit`}
        alignSelf="flex-start"
      >
        <Stack isInline align="center">
          <Box as={FaArrowLeft} />
          <Box as="span">Voltar</Box>
        </Stack>
      </Link>
      {isLoading && (
        <Flex flex={1} align="center" justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!isLoading && scheadule && (
        <Stack spacing={4}>
          <Input
            id="name"
            name="name"
            placeholder="Informe o nome do cronograma"
            isDisabled={isLoading}
            defaultValue={scheadule.name}
          />
          <Stack
            isInline
            spacing={4}
            justifyContent={{ base: "space-between", md: "flex-start" }}
          >
            <Button
              isLoading={isLoading}
              variantColor="yellow"
              alignSelf="flex-start"
              onClick={onOpen}
            >
              Editar Selecionados
            </Button>
            <Button
              isLoading={isLoading}
              variantColor="green"
              alignSelf="flex-start"
              onClick={onOpen}
            >
              {scheaduleId ? "Salvar" : "Criar"}
            </Button>
          </Stack>
          <EditTimeSlotModal
            onSubmit={onUpdateSelected}
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={onClose}
          />
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 7 }}
            spacing={{ base: 4, xl: 2 }}
            onMouseDown={() =>
              window.innerWidth >= 768 ? setMouseDown(true) : null
            }
            onMouseUp={() =>
              window.innerWidth >= 768 ? setMouseDown(false) : null
            }
          >
            {weekDays.map((wd) => (
              <Stack key={wd.id} shouldWrapChildren>
                <Flex
                  p={2}
                  bg={colors.mainComponentBg[colorMode]}
                  align="center"
                  userSelect="none"
                  justifyContent="center"
                >
                  {wd.name}
                </Flex>
                {scheadule.timeSlots
                  .filter((ts) => ts.weekDay === wd.id)
                  .map((ts) => (
                    <TimeSlot
                      key={ts.id}
                      id={ts.id}
                      price={ts.price}
                      time={ts.time}
                      active={ts.active}
                      selected={ts.selected}
                      updateTimeSlot={setScheadule}
                      isMouseDown={isMouseDown}
                      isMouseSelecting={isMouseSelecting}
                      setMouseSelecting={setMouseSelecting}
                    />
                  ))}
              </Stack>
            ))}
          </SimpleGrid>
          {/* <Stack display={{ base: "flex", md: "none" }} spacing={4}>
            {weekDays.map((wd) => (
              <Stack key={wd.id} shouldWrapChildren>
                <Flex
                  p={2}
                  bg={colors.mainComponentBg[colorMode]}
                  align="center"
                  userSelect="none"
                  justifyContent="center"
                >
                  {wd.name}
                </Flex>
                {scheadule.timeSlots
                  .filter((ts) => ts.weekDay === wd.id)
                  .map((ts) => (
                    <TimeSlot
                      key={ts.id}
                      id={ts.id}
                      price={ts.price}
                      time={ts.time}
                      active={ts.active}
                      selected={ts.selected}
                      updateTimeSlot={setScheadule}
                      isMouseDown={isMouseDown}
                      isMouseSelecting={isMouseSelecting}
                      setMouseSelecting={setMouseSelecting}
                    />
                  ))}
              </Stack>
            ))}
          </Stack> */}
        </Stack>
      )}
    </Stack>
  );
}
