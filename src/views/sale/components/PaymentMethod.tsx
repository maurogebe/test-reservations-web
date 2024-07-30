import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSelectedPaymentMethod } from "../store/stateSlice";

const paymentMethods = ['Tarjeta de Crédito', 'Efectivo', 'Transferencia Bancaria'];

export const PaymentMethod = () => {

	const dispatch = useDispatch()
  
	const { selectedPaymentMethod } = useSelector((state: RootState) => state.sale.state)
  
  const handleSelect = (value: string) => {
    dispatch(setSelectedPaymentMethod(value));
  };

  return (
    <Box>
      <Text fontSize="20px" fontWeight="bold" mb={2}>Metodos de pago:</Text>
      <Flex gap={2}>
        {paymentMethods.map((method) => (
          <Button
            size="sm"
            variant="outline"
            colorScheme={selectedPaymentMethod == method ? 'teal' : 'gray'}
            borderWidth={selectedPaymentMethod == method ? '2px' : '1px'}
            borderColor={selectedPaymentMethod == method ? 'gray.500' : 'gray.300'}
            onClick={() => handleSelect(method)}
            h="40px"
            p={2}
          >
            {method}
          </Button>
        ))}
      </Flex>
    </Box>
  )
}