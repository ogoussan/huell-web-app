import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface ButtonSpecificaion {
  label: string,
  onClick: () => void;
}

interface Props {
  title: string,
  isOpen: boolean,
  onClose: () => void;
  primaryButton: ButtonSpecificaion,
  secondaryButton: ButtonSpecificaion,
}

export const SimpleModal = ({isOpen, onClose, title, primaryButton, secondaryButton, children}: PropsWithChildren<Props>) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
          <Button variant='ghost' onClick={secondaryButton.onClick}>
              {secondaryButton.label}
            </Button>
            <Button colorScheme='blue' onClick={primaryButton.onClick}>
              {primaryButton.label}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}