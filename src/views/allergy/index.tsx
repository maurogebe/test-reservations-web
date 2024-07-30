import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { injectReducer } from "../../store";
import reducer from "./store";
import Card from "../../components/shared/Card/Card";
import CardHeader from "../../components/shared/Card/CardHeader";
import CardBody from "../../components/shared/Card/CardBody";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Modal } from "../../components/shared/Modal/Modal";
import { FormAllergy } from "./components/FormAllergy";
import { TableAllergy } from "./components/TableAllergy";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { initialState, setAllergySelected } from "./store/stateSlice";
import { createAllergy, getAllergies } from "./store/dataSlice";

injectReducer('allergy', reducer)

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  description: yup.string().required("Descripción es requerido")
});

const Allergies = () => {

  const textColor = useColorModeValue("gray.700", "white");
	const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

	useEffect(() => {
		dispatch(getAllergies())
	}, [])

  const resetForm = () => {
    dispatch(setAllergySelected(initialState.allergySelected))
    reset(initialState.allergySelected)
  }

  const onSubmit = async(data: any) => {
    await dispatch(createAllergy(data));
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>Alergias</Text>
            <Modal
              title="Crear Alergia"
              content={<FormAllergy reset={reset} register={register} errors={errors} />}
              textBtn="Crear"
              onClick={handleSubmit(onSubmit)}
              reset={resetForm}
              button={
                <Button
                  color='white'
                  bg='teal.300'
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                >
                  Agregar
                </Button>
              }
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <TableAllergy
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

export default Allergies;
