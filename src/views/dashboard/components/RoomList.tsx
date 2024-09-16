import { Flex, Image, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import Card from "../../../components/shared/Card/Card"
import { Room } from "../../../interfaces/room.interface"
import CardBody from "../../../components/shared/Card/CardBody"
import { Button } from "../../../components/shared/Button/Button"
import { roomRandom } from "../../../assets/images"
import { NumericFormat } from "react-number-format";
import { useEffect } from "react"
import { clearRooms } from "../store/dataSlice"
import { setRoomSelected } from "../store/stateSlice"

export const RoomList = ({ onOpen }: any) => {

  const dispatch = useDispatch();
  
	const { rooms } = useSelector((state: RootState) => state.dashboard.data)

  useEffect(() => {

    return () => {
      dispatch(clearRooms())
    }
  }, [])

  const onConfirmationReservation = (room: Room) => {
    dispatch(setRoomSelected(room));
    onOpen();
  }

  return (
    <Flex direction='column'>
      {
        rooms?.map((room: Room) => (
          <Card>
            <CardBody>
              <Flex gap={8}>
                <Image w='200px' src={roomRandom} />
                <Flex direction='column' alignItems='flex-start'>
                  <Text fontSize='1.5rem' fontWeight='bold'>{room.hotel.name}</Text>
                  <Text fontSize='.75rem'>{room.hotel.city.name}, {room.hotel.city.state.country.name}</Text>
                  <Text mt={2}>{room.description}</Text>
                  <NumericFormat
                    style={{ marginTop: '2rem', fontSize: '1.25rem', fontWeight: 'bold' }}
                    displayType="text"
                    value={room.price}
                    prefix=" $"
                    thousandSeparator
                  />
                  <Button mt={2} text='Reservar' onClick={() => onConfirmationReservation(room)}/>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))
      }
    </Flex>
  )
}