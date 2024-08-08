import { Flex, Tab, TabList, Tabs, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { injectReducer, RootState } from "../../../store";
import reducer from "./store";
import Card from "../../../components/shared/Card/Card";
import CardHeader from "../../../components/shared/Card/CardHeader";
import CardBody from "../../../components/shared/Card/CardBody";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getBiddingById, getPlayers, initialState, setTableData } from "./store/dataSlice";
import { TablePlayers } from "./components/TablePlayer";
import { useParams } from "react-router-dom";
import { Modal } from "../../../components/shared/Modal/Modal";
import { FormBid } from "./components/FormBid";
import { setBidSelected } from "./store/stateSlice";

injectReducer('biddingDetail', reducer)

const BiddingDetail = () => {

  const textColor = useColorModeValue("gray.700", "white");
	const dispatch = useDispatch()
  const { id } = useParams();

  const [selectedTab, setSelectedTab] = useState<string>('all');

	const { bidding } = useSelector((state: RootState) => state.biddingDetail.data)
	const { pageIndex, pageSize, sort, query, total } = useSelector((state: RootState) => state.biddingDetail.data.tableData)
	const { themeColor, primaryColorLevel } = useSelector((state: RootState) => state.theme.state)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const tableData = useMemo(() =>
		({ pageIndex, pageSize, sort, query, total }),
  [pageIndex, pageSize, sort, query, total])

	useEffect(() => {
		dispatch(getBiddingById(id))

    return () => {
      dispatch(setTableData(initialState.tableData))
    }
	}, [])

  const fetchData = () => {
		dispatch(getPlayers({ pageIndex, pageSize, sort, query, selectedTab }))
	}

	useEffect(() => {
    fetchData()
	}, [pageIndex, pageSize, sort, query, selectedTab, tableData])

  const onOpenFn = () => {
    dispatch(setBidSelected(null))
  }

  const onClickRow = (row: any) => {
    dispatch(setBidSelected(row?.original));
    onOpen();
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column' w='100%' gap={4}>
            <Text fontSize='2xl' color={textColor} fontWeight='bold'>{ bidding?.name }</Text>
            <Tabs variant='soft-rounded' colorScheme='green' onChange={(index: number) => setSelectedTab(index === 0 ? 'all' : index === 1 ? 'myBids' : 'noBid')}>
              <TabList>
                <Tab color={textColor} _selected={{ color: 'white', bg: `${themeColor}.${primaryColorLevel}` }}>Todos</Tab>
                <Tab color={textColor} _selected={{ color: 'white', bg: `${themeColor}.${primaryColorLevel}` }}>Mis pujas</Tab>
                <Tab color={textColor} _selected={{ color: 'white', bg: `${themeColor}.${primaryColorLevel}` }}>Sin pujar</Tab>
              </TabList>
            </Tabs>
          </Flex>
        </CardHeader>
        <CardBody>
          <TablePlayers
            onRowClick={onClickRow}
          />
        </CardBody>
      </Card>
      <Modal 
        onOpen={onOpenFn}
        onClose={onClose}
        isOpen={isOpen}
        title='Puja'
        content={<FormBid onClose={onClose}/>}
      />
    </Flex>
  );
};

export default BiddingDetail;
