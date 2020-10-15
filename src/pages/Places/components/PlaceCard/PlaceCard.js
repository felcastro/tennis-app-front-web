import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  Stack,
  Box,
  Image,
  useTheme,
  useColorMode,
  Heading,
  Link,
  Badge,
} from "@chakra-ui/core";

export default function PlaceCard({ place }) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const sports = [...new Set(place.courts.map((c) => c.type.sport.name))];
  return (
    <Link
      as={RouterLink}
      to={`/places/${place.id}`}
      bg={colors.mainComponentBg[colorMode]}
      _hover={{
        textDecoration: "none",
        bg: colors.mainBgSelected[colorMode],
      }}
      _focus={{ bg: colors.mainBgSelected[colorMode] }}
    >
      <Image
        src={place.pictureUrl}
        alt=""
        objectFit="cover"
        h="8rem"
        w="100%"
      />
      <Box px={2} py={1} textAlign="center">
        <Heading as="h3" fontSize={{ base: "md", md: "lg" }}>
          {place.name}
        </Heading>
        <Stack isInline spacing={2} mt={2}>
          {sports.map((s) => (
            <Badge variantColor="green" key={s}>
              {s}
            </Badge>
          ))}
        </Stack>
      </Box>
    </Link>
  );
}

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
};
