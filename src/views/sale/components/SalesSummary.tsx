import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { MedicamentSold } from "../../../interfaces/medicament-sold.interface";
import { Button } from "../../../components/shared/Button/Button";

export const SalesSummary = ({ onSubmit }: any) => {

	const { selectedMedicaments } = useSelector((state: RootState) => state.sale.state)
	const { loading } = useSelector((state: RootState) => state.sale.data)

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
        <Button text='Agregar' isLoading={loading} w="100px" alignSelf="flex-end" onClick={onSubmit}/>
      </Flex>
    </Box>
  )
};