import { useRef } from "react"
import { Box, Button, ModalBody, Modal as ModalChakra, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export const Modal = ({ title, content, button, textBtn, onClick = () => {} }: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const initialRef = useRef<any>(null)
  const finalRef = useRef<any>(null)

  const onClickBtn = async() => {
    try {
      await onClick();
      onClose();
    } catch (error) {
      
    }
  }

  return (
    <>
      <Box onClick={onOpen}>{ button }</Box>

      <ModalChakra
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{ title }</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            { content }
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme='blue' mr={3} onClick={onClickBtn}>
              { textBtn }
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
    </>
  )
}