import { Button as ButtonChakra, Flex, FormControl, FormErrorMessage, FormLabel, Image, Input, Text, useColorModeValue } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store"
import { NumericFormat,  } from "react-number-format";
import { Button } from "../../../../components/shared/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { createBid, getBid, updateBid } from "../store/dataSlice";
import { useEffect } from "react";

export const FormBid = ({ onClose }: any) => {
  
	const dispatch = useDispatch()
  
	const { bidSelected } = useSelector((state: RootState) => state.biddingDetail.state)
	const { amount, bid, bidActive, loadingBid } = useSelector((state: RootState) => state.biddingDetail.data)
	const { pageIndex, pageSize, sort, query } = useSelector((state: RootState) => state.biddingDetail.data.tableData)
  
  const textColor = useColorModeValue("gray.700", "white");

  const schema = Yup.object().shape({
		amount: Yup.number().min(bidActive?.amount ? bidActive.amount : 1000000, bidActive?.amount ? `La puja minima debe ser de EUR ${bidActive.amount + 1000000}` : "Monto minimo EUR 1'000.000").required('Ingresa tu puja')
	})
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { onChange } = register('amount'); 

  useEffect(() => {
    dispatch(getBid(bidSelected.id));
  }, [])

  // useEffect(() => {
  //   if (medicamentSelected?.id > 0 && medicamentSelected?.id !== null) {
  //     reset(medicamentSelected);
  //   }
  // }, [medicamentSelected, reset]);

  const onSubmit = async(data: any) => {
    try {
      if(bid?.id) {
        dispatch(updateBid({
          filters: { pageIndex, pageSize, sort, query },
          data: {
            amount: data.amount,
            id: bid.id
          }
        }))
      } else {
        dispatch(createBid({
          filters:{ pageIndex, pageSize, sort, query },
          data: {
            amount: data.amount,
            player: {
              id: bidSelected.id
            }
          }
        }))
      }
      onClose();
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justifyContent='space-around' gap={2}>
        <Image src={bidSelected?.shieldUrl} h='320px' />

        <Flex w='42%' direction='column' justifyContent='center' gap={4}>
          <Text>
            <Text
              fontWeight='bold'
              fontSize="xl"
              color={textColor}
            >Puja actual: </Text>
            <NumericFormat
              style={{ fontSize: '1.25rem' }}
              displayType="text"
              value={bidActive?.amount || 0}
              prefix="$ "
              thousandSeparator
            />
          </Text>
          <Text>
            <Text
              fontWeight='bold'
              fontSize="xl"
              color={textColor}
            >Saldo actual: </Text>
            <NumericFormat 
              style={{ fontSize: '1.25rem' }}
              displayType="text"
              value={amount || 0}
              prefix="$ "
              thousandSeparator
            />
          </Text>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel fontSize='xl'>Monto</FormLabel>
            <NumericFormat
              style={{ fontSize: '1.25rem' }}
              customInput={Input}
              prefix="$ "
              thousandSeparator
              name='amount'
              onValueChange={(values) => {
                onChange({ target: { name: 'amount', value: values.floatValue } })
              }}
            />
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
      <FormControl display='flex' justifyContent='center' mt={8}>
        <Button isLoading={loadingBid} type='submit' mr={3} loadingBid>
          Pujar
        </Button>
        <ButtonChakra onClick={onClose}>Cancelar</ButtonChakra>
      </FormControl>
    </form>
  )
}