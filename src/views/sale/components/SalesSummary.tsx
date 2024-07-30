import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { MedicamentSold } from "../../../interfaces/medicament-sold.interface";

export const SalesSummary = ({ onSubmit }: any) => {

	const { selectedMedicaments } = useSelector((state: RootState) => state.sale.state)

  const [subTotal, setSubTotal] = useState<number>(0)

  useEffect(() => {
    const subTotalByMedicament = selectedMedicaments.reduce((res: number, value: MedicamentSold) => res + (value?.quantity * value.medicament.cost), 0 as number)
    setSubTotal(subTotalByMedicament)
  }, [selectedMedicaments])

  return (
    <Box mt={5}>
      <Flex direction="column" gap={3}>
        <Flex justifyContent="space-between">
          <Text fontSize="lg">Subtotal:</Text>
          <Text fontSize="lg">${subTotal.toFixed(2)}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="lg">IVA:</Text>
          <Text fontSize="lg">${(subTotal * .19).toFixed(2)}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="lg">Total:</Text>
          <Text fontSize="lg">${(subTotal + (subTotal * .19)).toFixed(2)}</Text>
        </Flex>
        <Button bg='teal.300' colorScheme="teal" w="100px" alignSelf="flex-end" onClick={onSubmit}>Vender</Button>
      </Flex>
    </Box>
  )
};