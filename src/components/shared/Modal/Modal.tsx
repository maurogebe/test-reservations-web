import { useRef } from "react"
import { Box, Button as ButtonChakra, ModalBody, Modal as ModalChakra, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Button } from "../Button/Button"

export const Modal = ({ title, reset = () => {}, content, button, textBtn, onClick = () => {} }: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const initialRef = useRef<any>(null)
  const finalRef = useRef<any>(null)

  const onOpenFn = () => {
    onOpen();
    reset();
  }

  const onClickBtn = async() => {
    try {
      await onClick();
      onClose();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Box onClick={onOpenFn}>{ button }</Box>

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
            <Button mr={3} onClick={onClickBtn}>
              { textBtn }
            </Button>
            <ButtonChakra onClick={onClose}>Cancelar</ButtonChakra>
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
    </>
  )
}