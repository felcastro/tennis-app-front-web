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
  FormControl,
  Input,
  FormLabel,
  Select,
  Checkbox,
} from "@chakra-ui/core";
import { FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import Calendar from "react-calendar";
import Schedules from "./Schedules";

import "../../../components/Calendar/Calendar.css";

import mockApi from "../../../services/mockApi";

export default function Matches() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [place, setPlace] = useState(null);
  const [sports, setSports] = useState([]);
  const [courts, setCourts] = useState({});
  const [date, setDate] = useState(new Date());
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const loadPlace = () => {
    // setLoading(true);
    // setLoadError(false);
    // const url = `/api/places/${id}`;
    // mockApi
    //   .get(url, {
    //     headers: {
    //       Authorization: user.token,
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     setPlace(response.data);
    //     setSports([...new Set(response.data.courts.map((c) => c.sport))]);
    //   })
    //   .then(() => {
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoadError(true);
    //   });
  };

  const loadSchedules = () => {
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

  return (
    <Stack maxW="46rem" flex={1} pb={3}>
      {place ? (
        <Schedules place={place} setPlace={setPlace} />
      ) : (
        <Stack flex={1}>
          <Flex justifyContent="center">
            <Calendar
              onChange={(d) => setDate(d)}
              value={date}
              minDate={new Date()}
              style={{ backgroundColor: "black !important" }}
              tileDisabled={isLoading ? () => true : undefined}
            />
          </Flex>
          <Stack as="form" px={4} flex={1}>
            <FormControl>
              <FormLabel htmlFor="time">Horário</FormLabel>
              <Input
                id="time"
                name="time"
                placeholder="Informe o horário da partida"
                type="time"
                isDisabled={isLoading}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="sport">Tipo de quadra</FormLabel>
              <Select
                id="sport"
                name="sport"
                defaultValue={0}
                isDisabled={isLoading}
              >
                <option value={0}>Qualquer</option>
                <option value={1}>Saibro</option>
                <option value={2}>Rápida</option>
              </Select>
            </FormControl>
            <FormControl mt={2}>
              <Checkbox isDisabled={isLoading}>Quero quadra coberta</Checkbox>
            </FormControl>
            <Flex flex={1}>
              <Button
                as={RouterLink}
                isLoading={isLoading}
                variantColor="green"
                alignSelf={{ base: "flex-end", md: "auto" }}
                mt={4}
                w="100%"
                onClick={loadSchedules}
              >
                Buscar Horários
              </Button>
            </Flex>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
