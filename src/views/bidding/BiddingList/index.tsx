import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { injectReducer, RootState } from "../../../store";
import reducer from "./store";
import Card from "../../../components/shared/Card/Card";
import CardHeader from "../../../components/shared/Card/CardHeader";
import CardBody from "../../../components/shared/Card/CardBody";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Modal } from "../../../components/shared/Modal/Modal";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../../../components/shared/Button/Button";
import { createBidding, getBiddings } from "./store/dataSlice";
import { TableBidding } from "./components/TableBidding";

injectReducer('biddingList', reducer)

const BiddingList = () => {

  const textColor = useColorModeValue("gray.700", "white");
	const dispatch = useDispatch()

	const { pageIndex, pageSize, sort, query, total } = useSelector((state: RootState) => state.biddingList.data.tableData)

  const tableData = useMemo(() =>
		({ pageIndex, pageSize, sort, query, total }),
  [pageIndex, pageSize, sort, query, total])

	useEffect(() => {
		dispatch(getBiddings({ pageIndex, pageSize, sort, query }))
	}, [])

  const onSubmit = async(data: any) => {
    await dispatch(createBidding(data));
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          {/* <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
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
          </Flex> */}
        </CardHeader>
        <CardBody>
          <TableBidding
            // reset={reset}
            // register={register}
            // errors={errors}
            // handleSubmit={handleSubmit}
            tableData={tableData}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};

export default BiddingList;
