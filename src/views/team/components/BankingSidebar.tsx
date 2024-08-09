import { Flex, Grid, GridItem, Image } from "@chakra-ui/react"
import { RootState } from "../../../store"
import { useSelector } from "react-redux"
import { Player } from "../../../interfaces/player.interface"

export const BankingSidebar = ({ isModal = false, onClick = () => {} }: any) => {

	const { team } = useSelector((state: RootState) => state.team.data)
  const { lineupPlayers } = useSelector((state: RootState) => state.team.state);
  
  const handleDragStart = (id: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', `${id}`);
  };

  return (
    <Grid 
      py={4}
      templateColumns={{ sm: 'repeat(3, 1fr)', sm2: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
      gap={6}
    >
      {
        team.players
          .filter((player: Player) => !(lineupPlayers.some((ply: Player) => ply.id === player.id)))
          .map((player: Player) => (
            <GridItem 
              key={`bancking-sidebar-player-${player.id}`}
            >
              <Image 
                h={{ sm: '80px', md: '100px', lg: '120px' }}
                margin='0 auto'
                src={player.shieldUrl}
                onClick={isModal ? () => onClick(player) : () => {}}
                draggable={!isModal}
                onDragStart={handleDragStart(player.id)}
                cursor='pointer'
              />
            </GridItem>
          ))
      }
    </Grid>
  )
}