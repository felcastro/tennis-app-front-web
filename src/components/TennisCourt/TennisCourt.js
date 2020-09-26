import React from "react";
import { Box, Flex, Avatar, IconButton, AspectRatioBox } from "@chakra-ui/core";
import { FaPlus } from "react-icons/fa";

export default (props) => {
  const { match, isJoinable } = props;

  const TennisCourtSlot = (props = {}) => {
    const { player, isJoinable } = props;
    return (
      <Flex flex={1} align="center" justifyContent="center">
        {player ? (
          <Avatar src={player.pictureUrl} name={player.name} />
        ) : (
          isJoinable && (
            <IconButton
              icon={FaPlus}
              isRound
              size="lg"
              variantColor="green"
              variant="outline"
            />
          )
        )}
      </Flex>
    );
  };

  return (
    <AspectRatioBox ratio={2.1677}>
      <Flex border="1px solid" direction="column">
        <Box h="12.48%" borderBottom="1px solid"></Box>
        <Flex flex={1}>
          <Flex flex={1} borderRight="1px solid">
            <Flex w="46.17%" direction="column" borderRight="1px solid">
              <Box flex={1}></Box>
              <TennisCourtSlot
                player={match.teamOne[0]}
                isJoinable={isJoinable}
              />
            </Flex>
            <Flex flex={1} direction="column">
              <Flex
                flex={1}
                align="center"
                justifyContent="center"
                variant="outline"
                borderBottom="1px solid"
              >
                <TennisCourtSlot
                  player={match.teamOne[1]}
                  isJoinable={isJoinable}
                />
              </Flex>
              <Box flex={1}></Box>
            </Flex>
          </Flex>
          <Flex flex={1} borderLeft="1px solid">
            <Flex flex={1} direction="column">
              <Box flex={1} borderBottom="1px solid"></Box>
              <Flex flex={1} align="center" justifyContent="center">
                <TennisCourtSlot
                  player={match.teamTwo[1]}
                  isJoinable={isJoinable}
                />
              </Flex>
            </Flex>
            <Flex w="46.17%" direction="column" borderLeft="1px solid">
              <Flex flex={1} align="center" justifyContent="center">
                <TennisCourtSlot
                  player={match.teamTwo[0]}
                  isJoinable={isJoinable}
                />
              </Flex>
              <Box flex={1}></Box>
            </Flex>
          </Flex>
        </Flex>
        <Box h="12.48%" borderTop="1px solid"></Box>
      </Flex>
    </AspectRatioBox>
  );
};