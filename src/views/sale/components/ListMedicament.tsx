import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, HStack, Input, Stack, Text, VStack } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { Medicament } from "../../../interfaces/medicament.interface"
import { MedicamentSold } from "../../../interfaces/medicament-sold.interface"
import { setQuantitySelectedMedicaments } from "../store/stateSlice"

export const ListMedicament = () => {

	const dispatch = useDispatch()

	const { selectedMedicaments } = useSelector((state: RootState) => state.sale.state)
	const { medicaments } = useSelector((state: RootState) => state.medicament.data)

  return (
    <Box mt={5} zIndex={99}>
      <VStack align="stretch">
        <Flex
            as="header"
            position="sticky"
            top="0"
            zIndex="docked"
          >
            <HStack width="100%">
              <Text flex="1" textAlign="center" fontWeight="bold">Nombre</Text>
              <Text flex="1" textAlign="center" fontWeight="bold">Disponible</Text>
              <Text flex="1" textAlign="center" fontWeight="bold">Cantidad</Text>
              <Text flex="1" textAlign="center" fontWeight="bold">Precio unitario</Text>
              <Text flex="1" textAlign="center" fontWeight="bold">Total</Text>
            </HStack>
          </Flex>
          <Divider />
        <Stack>
          {
            selectedMedicaments
              .map((med: MedicamentSold) => ({ medicament: medicaments.find((m: Medicament) => m.id == med.medicament.id), quantity: med.quantity }))
              .map((med: MedicamentSold) => (
                <>
                  <Flex
                    key={med?.id}
                    // border="1px solid"
                    // borderColor="gray.200"
                    borderRadius="md"
                    overflow="hidden"
                    align="center"
                    bg="white"
                  >
                    <Text flex="1" textAlign="center" fontWeight="medium">{med?.medicament?.name}</Text>
                    <Text flex="1" textAlign="center">{med?.medicament?.stock} unidades</Text>
                    <Text flex="1" textAlign="center">
                      <Input
                        value={med.quantity || ''}
                        onChange={(e) => {
                          dispatch(setQuantitySelectedMedicaments({ id: med?.medicament?.id, quantity: e.target.value }))
                        }}
                        type="number"
                        min="0"
                        width="100px"
                        flex="1"
                        textAlign="center"
                      />
                    </Text>
                    <Text flex="1" textAlign="center">${med?.medicament?.cost}</Text>
                    <Text flex="1" textAlign="center">${med.medicament.cost * med?.quantity}</Text>
                  </Flex>
                  <Divider />
                </>
              ))
          }
        </Stack>
      </VStack>
    </Box>
  )
}