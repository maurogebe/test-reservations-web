import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { injectReducer, RootState } from "../../store";
import reducer from "./store";
import Card from "../../components/shared/Card/Card";
import CardHeader from "../../components/shared/Card/CardHeader";
import CardBody from "../../components/shared/Card/CardBody";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { getTeam, updateTeam } from "./store/dataSlice";
import { NumericFormat } from "react-number-format";
import Field from "./components/Field";
import { addPlayer } from "./store/stateSlice";
import { Player } from "../../interfaces/player.interface";
import { getIndexOfLineup } from "../../utils/others";
import { Button } from "../../components/shared/Button/Button";
import { CheckIcon } from "@chakra-ui/icons";

injectReducer('team', reducer)

const Team = () => {

  const textColor = useColorModeValue("gray.700", "white");
	const dispatch = useDispatch()
  const containerRef = useRef<any>(null);

	const { team, budget, lineup } = useSelector((state: RootState) => state.team.data)
	const { lineupPlayers } = useSelector((state: RootState) => state.team.state)
	const { pageIndex, pageSize, sort, query, total } = useSelector((state: RootState) => state.team.data.tableData)

  const tableData = useMemo(() =>
		({ pageIndex, pageSize, sort, query, total }),
  [pageIndex, pageSize, sort, query, total])

  const fetchData = () => {
		dispatch(getTeam({ pageIndex, pageSize, sort, query }))
	}

	useEffect(() => {
    fetchData()
	}, [pageIndex, pageSize, sort, query, tableData])

  const handleDrop = (rowIndex: number, colIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain')

    const player = team.players.find((ply: Player) => ply.id === Number(id))
    const index = getIndexOfLineup(lineup, rowIndex, colIndex);

    dispatch(addPlayer({ index, player: { ...player, orderTeam: index } }))
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.addEventListener('dragover', handleDragOver);
      container.addEventListener('drop', handleDrop);
    }
  };

  useEffect(() => {
    handleScroll();
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('dragover', handleDragOver);
        containerRef.current.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  const addedPlayers = lineupPlayers.some((player: Player) => 
    team.lineupPlayers.some((ply: Player) => ply.id === player.id && player.id !== 0)
  );

  const updatedPlayers = lineupPlayers.some((player: Player) => 
    team.lineupPlayers.find((ply: Player) => ply.id === player.id)?.orderTeam != player.orderTeam && player.id !== 0
  );

  const removedPlayers = team.lineupPlayers.some((player: Player) => 
    !lineupPlayers.some((ply: Player) => ply.id === player.id)
  );

  const onSubmit = () => {
    dispatch(updateTeam({ ...team, lineupPlayers: lineupPlayers.filter((ply: Player) => ply.id > 0) }))
  }

  return (
    <Flex ref={containerRef} direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column' w='100%' gap={4}>
            <Text fontSize='2xl' color={textColor} fontWeight='bold'>{ team?.name }</Text>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>
              Saldo: 
              <NumericFormat
                displayType="text"
                value={budget || 0}
                prefix=" $"
                thousandSeparator
              />
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Field handleDrop={handleDrop} handleDragOver={handleDragOver} />
        </CardBody>
      </Card>
      {
        (addedPlayers || updatedPlayers || removedPlayers) && (
          <Button
            position='fixed'
            bottom={8}
            right={8}
            borderRadius='50%'
            p={0}
            onClick={onSubmit}
          >
            <CheckIcon boxSize={8} />
          </Button>
        )
      }
    </Flex>
  );
};

export default Team;
