import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  useTheme,
  useColorMode,
  Box,
  Stack,
  Flex,
  Divider,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/core";
import { FaCalendarDay, FaMapMarkerAlt } from "react-icons/fa";
import { GiTennisRacket, GiTennisCourt } from "react-icons/gi";

export default function MatchCard({ match }) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const matchDate = new Date(match.matchDate);

  return (
    <Box bg={colors.mainCardLeftBg[colorMode]} borderRadius="10px 0 0 10px">
      <Flex ml={2} p={2} bg={colors.mainComponentBg[colorMode]}>
        <Flex flex={1} flexDirection="column" justifyContent="space-between">
          <Stack isInline align="center" spacing={2}>
            <Box as={GiTennisRacket} />
            <Box as="span">
              {match.numberOfPlayers === 2 ? "Simples" : "Duplas"}
            </Box>
          </Stack>
          <Stack isInline align="center" spacing={2}>
            <Box as={FaCalendarDay} />
            <Box as="span">
              {`${matchDate.toLocaleString([], {
                day: "2-digit",
                month: "2-digit",
              })} - ${matchDate.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </Box>
          </Stack>
          <Stack isInline align="center" spacing={2}>
            <Box as={FaMapMarkerAlt} />
            <Box as="span">{match.possiblePlaces[0].name}</Box>
          </Stack>
          <Stack isInline align="center" spacing={2}>
            <Box as={GiTennisCourt} />
            <Box as="span">Quadra 3</Box>
          </Stack>
        </Flex>
        <Divider orientation="vertical" />
        <Flex align="center">
          <SimpleGrid
            columns={match.numberOfPlayers === 2 ? 2 : { base: 2, md: 4 }}
            spacing={2}
            align="center"
          >
            {match.teamOne.map((user) => (
              <Avatar src={user.pictureUrl} name={user.name} key={user._id} />
            ))}
            {match.teamTwo.map((user) => (
              <Avatar src={user.pictureUrl} name={user.name} key={user._id} />
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Box>
  );
}

MatchCard.propTypes = {
  match: PropTypes.object.isRequired,
};
