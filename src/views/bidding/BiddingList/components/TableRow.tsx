import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { FormBidding } from "./FormBidding";
import { Modal } from "../../../../components/shared/Modal/Modal";

export const TableRow = ({ reset, register, errors, handleSubmit = () => {}, textColor, row }: any) => {

  const dispatch = useDispatch();

  const navigateBiddingDetail = () => {

  }

  // const onEdit = () => {
  //   dispatch(setMedicamentSelected(row))
  // }

  // const onSubmit = async(data: any) => {
  //   await dispatch(updateMedicament(data));
  // }

  return (
    <Tr onClick={navigateBiddingDetail}>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          minWidth="100%"
        >
          { row?.open ? 'Abierta' : 'Cerrada' }
        </Text>
      </Td>

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          minWidth="100%"
        >
          {row?.name}
        </Text>
      </Td>
      
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          minWidth="100%"
        >
          {row?.startDate}
        </Text>
      </Td>
      
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          minWidth="100%"
        >
          {row?.endDate}
        </Text>
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {row?.budget}
        </Text>
      </Td>
      <Td>
        {/* <Modal
          title="Editar Medicamento"
          content={<FormBidding reset={reset} register={register} errors={errors} />}
          textBtn="Editar"
          onClick={handleSubmit(onSubmit)}
          button={
            <Button p="0px" bg="transparent" variant="no-hover">
              <Text
                fontSize="md"
                color="gray.400"
                fontWeight="bold"
                cursor="pointer"
                onClick={onEdit}
              >
                Editar
              </Text>
            </Button>
          }
        /> */}
      </Td>
    </Tr>
  )
}