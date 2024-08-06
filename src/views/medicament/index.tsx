import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { injectReducer } from "../../store";
import reducer from "./store";
import Card from "../../components/shared/Card/Card";
import CardHeader from "../../components/shared/Card/CardHeader";
import CardBody from "../../components/shared/Card/CardBody";
import { useDispatch } from "react-redux";
import { createMedicament, getMedicaments } from "./store/dataSlice";
import { useEffect } from "react";
import { Modal } from "../../components/shared/Modal/Modal";
import { FormMedicament } from "./components/FormMedicament";
import { TableMedicament } from "./components/TableMedicament";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { initialState, setMedicamentSelected } from "./store/stateSlice";
import { Button } from "../../components/shared/Button/Button";

injectReducer('medicament', reducer)

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  form: yup.string().required("Forma es requerida"),
  stock: yup.number().required("Stock es requerido"),
  cost: yup.number().required("Costo es requerido"),
  description: yup.string().required("Descripción es requerida"),
});

const Medicaments = () => {

  const textColor = useColorModeValue("gray.700", "white");
	const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

	useEffect(() => {
		dispatch(getMedicaments())
	}, [])

  const resetForm = () => {
    dispatch(setMedicamentSelected(initialState.medicamentSelected))
    reset(initialState.medicamentSelected)
  }

  const onSubmit = async(data: any) => {
    await dispatch(createMedicament(data));
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>Medicamentos</Text>
            <Modal
              title="Crear Medicamento"
              content={<FormMedicament reset={reset} register={register} errors={errors} />}
              textBtn="Crear"
              onClick={handleSubmit(onSubmit)}
              reset={resetForm}
              button={
                <Button text='Agregar'/>
              }
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <TableMedicament
            reset={reset}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Medicaments;
