import { useEffect } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { injectReducer } from "../../store";
import Card from "../../components/shared/Card/Card";
import CardBody from "../../components/shared/Card/CardBody";
import { useDispatch } from "react-redux";
import { ReservationTable } from "./components/ReservationTable";
import { getReservations } from "./store/dataSlice";
import reducer from "./store";
import { FormReservation } from "./components/FormReservation";

injectReducer('reservation', reducer)

const Reservations = () => {

  const dispatch = useDispatch();
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(getReservations());
  }, [])

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Card minH='83px'>
        <CardBody>
          <Flex flexDirection='column' w='100%' gap={4}>
            <Text fontSize='1.75rem' fontWeight='bold'>Reservaciones</Text>
            <ReservationTable onOpenEdit={onOpen} />
            <FormReservation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Reservations;
