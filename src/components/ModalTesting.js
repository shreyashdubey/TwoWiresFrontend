import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const ParentModal = ({ isOpen, onClose, onChildOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Parent Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Parent modal content goes here.</p>
          <Button
            colorScheme="blue"
            onClick={() => {
              onChildOpen();
              onClose();
            }}
          >
            Open Child Modal
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close Parent Modal
          </Button>
          <Button colorScheme="green">Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ChildModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Child Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Child modal content goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close Child Modal
          </Button>
          <Button colorScheme="green">Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ModalTesting = () => {
  const {
    isOpen: isParentOpen,
    onOpen: onParentOpen,
    onClose: onParentClose,
  } = useDisclosure();
  const {
    isOpen: isChildOpen,
    onOpen: onChildOpen,
    onClose: onChildClose,
  } = useDisclosure();

  return (
    <div>
      <Button onClick={onParentOpen}>Open Parent Modal</Button>
      <ParentModal
        isOpen={isParentOpen}
        onClose={onParentClose}
        onChildOpen={onChildOpen}
      />
      <ChildModal isOpen={isChildOpen} onClose={onChildClose} />
    </div>
  );
};

export default ModalTesting;
