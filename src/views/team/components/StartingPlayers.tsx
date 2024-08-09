import { useEffect, useState } from "react";
import { Box, Button, Grid, GridItem, Image, useDisclosure } from "@chakra-ui/react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "../../../interfaces/player.interface";
import { CloseIcon } from "@chakra-ui/icons";
import { addPlayer, deletePlayer } from "../store/stateSlice";
import { getIndexOfLineup } from "../../../utils/others";
import { Modal } from "../../../components/shared/Modal/Modal";
import { BankingSidebar } from "./BankingSidebar";

export const StartingPlayers = ({ handleDrop, handleDragOver }: any) => {

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { lineup } = useSelector((state: RootState) => state.team.data);
  const { lineupPlayers } = useSelector((state: RootState) => state.team.state);
  
  const [rows, setRows] = useState<any>([]);
  const [areas, setAreas] = useState<string>('');
  const [maxLineup, setMaxLineup] = useState<number>(0);
  const [indexSelected, setIndexSelected] = useState<number>(-1);

  useEffect(() => {
    if(lineup?.length > 0) {
      setMaxLineup(Math.max(...lineup));

      const flattenedPlayers = lineupPlayers.slice(0, lineup.reduce((a: any, b: any) => a + b, 0));

      const resRows = lineup.map((numPlayersInRow: Player) => {
        return flattenedPlayers.splice(0, numPlayersInRow);
      });
      setRows(resRows);

      const gridTemplateAreas = getAreas();
      setAreas(gridTemplateAreas)
    }
  }, [lineup, lineupPlayers])

  const getAreas = () => {
    return lineup.map((numPlayersInRow: any, rowIndex: number) => {
      const areas = Array(maxLineup).fill('');
      let iTemp = 0;
      for (let i = 0; i < maxLineup; i++) {
        if(maxLineup === 4) {
          if(numPlayersInRow === 3 && (i === 1 || i === 2)) iTemp = 1;
          if(numPlayersInRow === 2) {
            if(i === 1) iTemp = 0;
            if(i === 2 || i === 3) iTemp = 1;
          }
          if(numPlayersInRow === 1) iTemp = 0;
          } else if(maxLineup === 5) {
            if(numPlayersInRow === 4 && i === 2) iTemp = 6
          if(numPlayersInRow === 3 && (i === 1 || i === 2 || i === 3)) iTemp = 1
          if(numPlayersInRow === 2) {
            if(i === 1) iTemp = 0;
            if(i === 3 || i === 4) iTemp = 1;
          }
          if(numPlayersInRow === 1) iTemp = 0
        }
        areas[i] = `player${rowIndex}-${iTemp}`;
        iTemp++;
      }
      return `'${areas.join(' ')}'`;
    }).join(' ');
  };

  const handleDragStart = (id: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', `${id}`);
  };

  const deletePlayerFn = (rowIndex: number, colIndex: number) => {
    dispatch(deletePlayer(getIndexOfLineup(lineup, rowIndex, colIndex)));
  };

  const indexSelectedFn = (rowIndex: number, colIndex: number) => {
    const idx = getIndexOfLineup(lineup, rowIndex, colIndex);
    setIndexSelected(idx);
    onOpen();
  }

  const addPlayerFromModal = (player: Player) => {
    if(indexSelected >= 0) {
      dispatch(addPlayer({ index: indexSelected, player }));
      onClose();
    }
  };

  return (
    <Grid
      position='absolute'
      top={0}
      left={0}
      px={{ sm: '10%', lg: '15%' }}
      w='100%'
      height='100%'
      templateColumns={`repeat(${maxLineup}, 1fr)`}
      templateRows='repeat(4, 1fr)'
      templateAreas={areas}
      gap={4}
    >
      {
        rows.map((row: any, rowIndex: number) => (
          row.map((player: Player, colIndex: number) => (
            <GridItem
              key={`starting-player-${rowIndex}-${colIndex}`}
              area={`player${rowIndex}-${colIndex}`}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box position='relative'>
                <Image 
                  h={{ sm: '60px', sm2: '80px', md: '100px', lg: '120px' }} 
                  src={player.shieldUrl} 
                  alt={player.firstName}
                  draggable
                  onDrop={handleDrop(rowIndex, colIndex)}
                  onDragOver={handleDragOver}
                  onDragStart={handleDragStart(player.id)}
                  onClick={player.id === 0 ? () => indexSelectedFn(rowIndex, colIndex) : () => {}}
                  cursor='pointer'
                />
                {
                  player.id !== 0 && (
                    <CloseIcon
                      boxSize={3}
                      color='red.400'
                      fontWeight='bold'
                      position='absolute'
                      top={0}
                      right={0}
                      cursor='pointer'
                      onClick={() => deletePlayerFn(rowIndex, colIndex)}
                    />
                  )
                }
              </Box>
            </GridItem>
          ))
        ))
      }
      <Modal 
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        title='Jugadores'
        content={<BankingSidebar isModal={true} onClick={addPlayerFromModal} />}
        actions={<Button onClick={onClose}>Cerrar</Button>}
      />
    </Grid>
  );
};
