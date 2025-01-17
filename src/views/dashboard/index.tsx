import { useEffect } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { injectReducer } from "../../store";
import reducer from "./store";
import Card from "../../components/shared/Card/Card";
import CardBody from "../../components/shared/Card/CardBody";
import { FormSearch } from "./components/FormSearch";
import { useDispatch } from "react-redux";
import { getCities } from "./store/dataSlice";
import { RoomList } from "./components/RoomList";
import { FormReservation } from "./components/FormReservation";

injectReducer('dashboard', reducer)

const Dashboard = () => {

  const dispatch = useDispatch();
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(getCities());
  }, [])

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Card minH='83px'>
        <CardBody>
          <Flex flexDirection='column' w='100%' gap={4}>
            <Text fontSize='1.75rem' fontWeight='bold'>Hoteles</Text>
            <FormSearch />
            <RoomList onOpen={onOpen} />
            <FormReservation
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
            />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Dashboard;
