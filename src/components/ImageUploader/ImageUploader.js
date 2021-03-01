import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
} from "@chakra-ui/react";

export default function ImageUploader({ upload, isOpen, onClose }) {
  const [isLoading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const inputFile = useRef(null);

  async function onSubmit(e) {
    setLoading(true);
    const fileData = new FormData();
    fileData.append("file", e.target.files[0]);

    e.persist();

    const success = await upload(fileData);

    if (success) {
      onClose();
    } else {
      setSubmitError("Erro ao enviar arquivo.");
      e.target.value = null;
    }

    setLoading(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forma de Upload</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {submitError && (
              <Box as="span" color="red.500">
                {submitError}
              </Box>
            )}
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={() => {
                inputFile.current.click();
              }}
            >
              Escolher Foto
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={onSubmit}
      />
    </Modal>
  );
}

ImageUploader.propTypes = {
  upload: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
