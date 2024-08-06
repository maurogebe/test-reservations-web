import { Box, Divider, Flex, Input, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { injectReducer, RootState } from "../../store";
import reducer from "./store";
import Card from "../../components/shared/Card/Card";
import CardHeader from "../../components/shared/Card/CardHeader";
import CardBody from "../../components/shared/Card/CardBody";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getPatients } from "../patient/store/dataSlice";
import { createSale } from "./store/dataSlice";
import { SelectMedicaments } from "./components/SelectMedicaments";
import { getMedicaments } from "../medicament/store/dataSlice";
import { ListMedicament } from "./components/ListMedicament";
import { SelectPatients } from "./components/SelectPatients";
import { SalesSummary } from "./components/SalesSummary";
import { PaymentMethod } from "./components/PaymentMethod";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { apiPrescriptionOCR } from "../../services/PrescriptionService";
import { MedicamentPrescribed } from "../../interfaces/medicament-prescribed.interface";
import { MedicamentSold } from "../../interfaces/medicament-sold.interface";
import { setSelectedMedicaments } from "./store/stateSlice";
import { toast } from "../../App";
import { Button } from "../../components/shared/Button/Button";

injectReducer('sale', reducer)
injectReducer('patient', reducer)
injectReducer('medicament', reducer)

const Sales = () => {

  const textColor = useColorModeValue("gray.700", "white");
	const dispatch = useDispatch()
  const fileInputRef = useRef<any>(null);

	const { selectedPatient, selectedMedicaments } = useSelector((state: RootState) => state.sale.state)

  const [loadingFile, setLoadingFile] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getPatients())
		dispatch(getMedicaments())
	}, [])

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async(event: any) => {
    const file = event.target.files[0];
    if (file) {
      setLoadingFile(true)
      try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await apiPrescriptionOCR(formData);
        const medicamentsByPrescription: MedicamentSold = data?.medicamentPrescribeds?.map((e: MedicamentPrescribed) => ({
          quantity: 1,
          medicament: e.medicament
        }))
        dispatch(setSelectedMedicaments(medicamentsByPrescription))
        setLoadingFile(false)
        toast({
          title: 'Medicamentos obtenidos de la prescripción correctamente.',
          status: 'success',
          duration: 4000,
          isClosable: true
        })
      } catch (error) {
        setLoadingFile(false)
        toast({
          title: 'Error obteniendo los medicamentos de la prescripción.',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      }
    }
  };

  const onSubmit = async() => {
    const sale = {
      saleDate: new Date(),
      patient: selectedPatient,
      medicamentsSold: selectedMedicaments
    }
    await dispatch(createSale(sale));
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} minH="300px">
        <CardHeader p='6px 0px 22px 0px'>
          <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>Venta</Text>
            <Box>
              <Button
                isLoading={loadingFile}
                onClick={handleButtonClick}
              >
                Cargar
                <Tooltip label='Carga tu prescripción para cargar los medicamentos.' fontSize='md'>
                  <QuestionOutlineIcon ml={1}/>
                </Tooltip>
              </Button>
              <Input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex w="100%" direction={{ lg: 'row', sm: 'column' }} gap={4}>
            <Flex w={{ lg: '60%', md: '100%' }}>
              <Flex w='100%' direction="column" gap={10}>
                <SelectMedicaments />
                <ListMedicament />
              </Flex>
            </Flex>
            <Divider orientation='vertical'/>
            <Flex direction="column"  w={{ lg: '60%', sm: '100%' }} gap={4}>
              <SelectPatients />
              <PaymentMethod />
              <SalesSummary onSubmit={onSubmit}/>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Sales;
