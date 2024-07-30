import { Table, Tbody, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { TableRow } from "./TableRow";

export const TablePatient = ({ reset, register, errors, handleSubmit, selectedAllergies, setSelectedAllergies }: any) => {
  
  const columns = ["Nombre", "Correo", "Numero de seguro", "Fecha de nacimiento", ""]
  
  const textColor = useColorModeValue("gray.700", "white");

	const { patients } = useSelector((state: RootState) => state.patient.data)

  return (
    <Table w="100%" variant='simple' color={textColor}>
      <Thead>
        <Tr my='.8rem' pl='0px' color='gray.400'>
          {columns.map((column: any, idx: any) => {
            return (
              <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : "initial"}>
                {column}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {patients?.map((row: any) => {
          return (
            <TableRow
              key={`${row.id}-${row.name}`}
              reset={reset}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              row={row}
              selectedAllergies={selectedAllergies}
              setSelectedAllergies={setSelectedAllergies}
            />
          );
        })}
      </Tbody>
    </Table>
  )
}