import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { injectReducer, RootState } from "../../store";
import reducer from "./store";
import Card from "../../components/shared/Card/Card";
import CardHeader from "../../components/shared/Card/CardHeader";
import CardBody from "../../components/shared/Card/CardBody";
import { useDispatch, useSelector } from "react-redux";
import { createPatient, getPatients } from "./store/dataSlice";
import { useEffect, useState } from "react";
import { Modal } from "../../components/shared/Modal/Modal";
import { FormPatient } from "./components/FormPatient";
import { TablePatient } from "./components/TablePatient";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { initialState, setPatientSelected } from "./store/stateSlice";
import { Allergy } from "../../interfaces/allergy.interface";
import { Button } from "../../components/shared/Button/Button";

injectReducer('patient', reducer)
injectReducer('allergy', reducer)

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  email: yup.string().email("Correo invalido").required("Correo es requerido"),
  healthInsuranceNumber: yup.string().required("Numero de seguro de salud es requerido"),
  birthDate: yup.date().required("Fecha de nacimiento es requerida")
});

const Patients = () => {

  const textColor = useColorModeValue("gray.700", "white");
	const dispatch = useDispatch()

	const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

	const { patientSelected } = useSelector((state: RootState) => state.patient.state)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

	useEffect(() => {
		if (patientSelected?.allergies?.length > 0) {
      const allergiesByPatient: string[] = patientSelected.allergies.map((e: Allergy) => `${e.name}::${e.id}`)
      setSelectedAllergies(allergiesByPatient);
    }
	}, [patientSelected])

	useEffect(() => {
		dispatch(getPatients())
	}, [])

  const resetForm = () => {
    dispatch(setPatientSelected(initialState.patientSelected))
    reset(initialState.patientSelected)
  }

  const onSubmit = async(data: any) => {
    const allergies: { id: string }[] = selectedAllergies.map((allergy) => {
      const allergySplit = allergy.split('::');
      return { id: allergySplit[allergySplit.length - 1] }
    })
    await dispatch(createPatient({ ...data, allergies }));
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>Pacientes</Text>
            <Modal
              title="Crear Paciente"
              content={<FormPatient reset={reset} register={register} errors={errors} selectedAllergies={selectedAllergies} setSelectedAllergies={setSelectedAllergies} />}
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
          <TablePatient
            reset={reset}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            selectedAllergies={selectedAllergies}
            setSelectedAllergies={setSelectedAllergies}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Patients;
