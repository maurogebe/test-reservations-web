import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { setPatientSelected } from "../store/stateSlice"
import { useDispatch } from "react-redux"
import { FormPatient } from "./FormPatient";
import { Modal } from "../../../components/shared/Modal/Modal";
import { updateAllergy } from "../../allergy/store/dataSlice";

export const TableRow = ({ reset, register, errors, handleSubmit = () => {}, textColor, row, selectedAllergies, setSelectedAllergies }: any) => {

  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setPatientSelected(row))
  }

  const onSubmit = async(data: any) => {
    await dispatch(updateAllergy(data));
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
          {row?.email}
        </Text>
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {row?.healthInsuranceNumber}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {row?.birthDate}
        </Text>
      </Td>
      <Td>
        <Modal
          title="Editar Paciente"
          content={<FormPatient reset={reset} register={register} errors={errors} selectedAllergies={selectedAllergies} setSelectedAllergies={setSelectedAllergies} />}
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