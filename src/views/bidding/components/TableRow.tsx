import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { setMedicamentSelected } from "../store/stateSlice"
import { useDispatch } from "react-redux"
import { FormMedicament } from "./FormMedicament";
import { Modal } from "../../../components/shared/Modal/Modal";
import { updateMedicament } from "../store/dataSlice";

export const TableRow = ({ reset, register, errors, handleSubmit = () => {}, textColor, row }: any) => {

  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setMedicamentSelected(row))
  }

  const onSubmit = async(data: any) => {
    await dispatch(updateMedicament(data));
  }

  return (
    <Tr>
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
          {row?.description}
        </Text>
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {row?.cost}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {row?.stock}
        </Text>
      </Td>
      <Td>
        <Modal
          title="Editar Medicamento"
          content={<FormMedicament reset={reset} register={register} errors={errors} />}
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
        />
      </Td>
    </Tr>
  )
}