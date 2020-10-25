import React, { useState, useEffect, useRef } from "react";
import PropTypes, { func } from "prop-types";
import { useForm } from "react-hook-form";
import {
  Stack,
  useTheme,
  useColorMode,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/core";

export default function EditTimeSlotModal({
  onSubmit,
  isLoading,
  isOpen,
  onClose,
  selectedTimeSlots,
}) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue,
    watch,
    reset,
  } = useForm({ shouldUnregister: false });
  const initialRef = useRef();
  const priceInputRef = useRef();
  const [costType, setCostType] = useState("0");

  const watchIsActive = watch("isActive", true);

  function beforeSubmit(data) {
    const newData = { ...data };

    if (costType !== "0" && newData.price) {
      try {
        newData.price =
          costType === "1"
            ? parseFloat(newData.price)
            : parseFloat(-newData.price);
      } catch {
        setError("price", { type: "manual", message: "Valor inválido" });
        return;
      }
    } else {
      newData.price = 0;
    }

    onSubmit(newData);
  }

  useEffect(() => {
    if (isOpen) {
      const timeSlot = selectedTimeSlots[0];
      if (
        timeSlot &&
        timeSlot.price &&
        timeSlot.active &&
        selectedTimeSlots.every((ts) => ts.price === timeSlot.price)
      ) {
        setCostType(timeSlot.price >= 0 ? "1" : "2");
        setValue("price", Math.abs(timeSlot.price));
      }
    } else {
      setCostType("0");
      reset();
    }
  }, [isOpen]);

  useEffect(() => {
    if (priceInputRef.current) {
      priceInputRef.current.focus();
    }
  }, [costType]);

  return (
    <Modal
      blockScrollOnMount={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(beforeSubmit)}
        color={colors.mainFont[colorMode]}
      >
        <ModalHeader>Atualizar Horários</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.price}>
              <FormLabel htmlFor="price">Custo (R$)</FormLabel>
              <Stack spacing={2}>
                <RadioGroup
                  onChange={(e) => setCostType(e.target.value)}
                  value={costType}
                >
                  <Radio value="0">Nenhum</Radio>
                  <Radio value="1" isDisabled={!watchIsActive}>
                    Adicional
                  </Radio>
                  <Radio value="2" isDisabled={!watchIsActive}>
                    Desconto
                  </Radio>
                </RadioGroup>
                <Input
                  id="price"
                  name="price"
                  placeholder="0.00"
                  type="number"
                  isDisabled={isLoading || costType === "0"}
                  ref={(e) => {
                    register(e, {
                      min: { value: 0, message: "Não pode ser menor que zero" },
                    });
                    priceInputRef.current = e;
                  }}
                />
              </Stack>
              <FormErrorMessage>
                {errors.price && errors.price.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.isActive}>
              <Checkbox
                id="isActive"
                name="isActive"
                isDisabled={isLoading}
                defaultIsChecked
                ref={register()}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setCostType("0");
                  }
                }}
              >
                Horário ativo
              </Checkbox>
              <FormErrorMessage>
                {errors.isActive && errors.isActive.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            type="submit"
            variantColor="green"
            width="100%"
            mt={4}
            ref={initialRef}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

EditTimeSlotModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedTimeSlots: PropTypes.arrayOf(PropTypes.object).isRequired,
};
