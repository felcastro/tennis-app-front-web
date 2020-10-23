import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Stack,
  Box,
  useTheme,
  useColorMode,
  PseudoBox,
} from "@chakra-ui/core";
import { FaBan } from "react-icons/fa";

function TimeSlot({
  id,
  price,
  time,
  active,
  selected,
  updateTimeSlot,
  isMouseDown,
  isMouseSelecting,
  setMouseSelecting,
}) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const styles = {
    bgSelected: {
      light: "green.300",
      dark: "green.500",
    },
    priceColor: {
      isCost: {
        light: "blue.500",
        dark: "blue.200",
      },
      isDiscount: {
        light: "red.500",
        dark: "red.200",
      },
    },
  };

  function setSelected() {
    updateTimeSlot((prev) => {
      const timeSlots = [...prev.timeSlots];
      const slot = timeSlots.find((ts) => ts.id === id);
      slot.selected = !slot.selected;
      return { ...prev, timeSlots };
    });
  }

  function onMouseDown() {
    setMouseSelecting(selected);
    setSelected();
  }

  function onMouseEnter() {
    if (isMouseDown && isMouseSelecting === selected) {
      setSelected();
    }
  }

  return (
    <PseudoBox
      _hover={{
        bg: selected ? null : colors.mainBgSelected[colorMode],
      }}
      flex={1}
      justifyContent="space-between"
      p={2}
      fontSize={{ base: "auto", xl: "sm" }}
      cursor="pointer"
      userSelect="none"
      bg={() => {
        if (selected) {
          return styles.bgSelected[colorMode];
        }
        if (active) {
          return colors.mainComponentBg[colorMode];
        }
        return colors.mainBgInactive[colorMode];
      }}
      touchAction="none"
      color={active ? "auto" : colors.mainFontInactive[colorMode]}
      onMouse={() => onMouseDown()}
      onMouseEnter={() => onMouseEnter()}
    >
      <Flex align="center" justifyContent="space-between">
        <Stack isInline align="center">
          {!active && <Box as={FaBan} />}
          <Box as="span">{time}</Box>
        </Stack>
        {price !== 0 && (
          <Box
            as="span"
            color={
              price >= 0
                ? styles.priceColor.isCost[colorMode]
                : styles.priceColor.isDiscount[colorMode]
            }
          >
            {`${price >= 0 ? "+" : "-"} R$ ${Math.abs(price).toFixed(2)}`}
          </Box>
        )}
      </Flex>
    </PseudoBox>
  );
}

TimeSlot.defaultProps = {
  selected: false,
};

TimeSlot.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  selected: PropTypes.bool,
  updateTimeSlot: PropTypes.func.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  isMouseSelecting: PropTypes.bool.isRequired,
  setMouseSelecting: PropTypes.func.isRequired,
};

export default memo(TimeSlot, (prev, next) => {
  return (
    prev.selected === next.selected && prev.isMouseDown === next.isMouseDown
  );
});
