import { useRef } from "react"
import { Box, ModalBody, Modal as ModalChakra, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

export const Modal = ({ onOpen, onClose, isOpen, title, reset = () => {}, content, button, actions }: any) => {
  
  const initialRef = useRef<any>(null)
  const finalRef = useRef<any>(null)

  const onOpenFn = () => {
    onOpen();
    reset();
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
          <ModalHeader textAlign="center" fontSize='x-large'>{ title }</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            { content }
          </ModalBody>

          {
            actions && (
              <ModalFooter justifyContent="center">
                { actions }
              </ModalFooter>
            )
          }
        </ModalContent>
      </ModalChakra>
    </>
  )
}