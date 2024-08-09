import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { cardEmptyImage } from '../../../assets/images';
import { Player } from '../../../interfaces/player.interface';

const objEmpty = (index: number) => ({ id: 0, shieldUrl: cardEmptyImage, firstName: '', orderTeam: index })

const fillArray = (): Player[] => {
    const res = [];
    for (let index = 0; index < 11; index++) {
        res.push(objEmpty(index));
    }
    return res;
}

export interface State {
    lineupPlayers: Player[]
}

export const initialState: State = {
    lineupPlayers: []
};

const stateSlice = createSlice({
    name: 'team/state',
    initialState,
    reducers: {
        addPlayers: (state, action: PayloadAction<Player[]>) => {
            console.log(action.payload)
            state.lineupPlayers = fillArray()
                .map((player: Player, i: number) => {
                    const existPlayer = action.payload.find((p: Player) => p.orderTeam === i);
                    if(existPlayer) return existPlayer;
                    return player;
                })
                .sort((a: Player, b: Player) => (a.orderTeam || 0) - (b.orderTeam || 0))
        },
        addPlayer: (state, action) => {
            const { index, player } = action.payload;
            const currentState = current(state);
            const indexPlayer = currentState.lineupPlayers.findIndex((ply: Player) => player.id === ply.id);
            if(indexPlayer >= 0) {
                state.lineupPlayers = currentState.lineupPlayers.map((ply: Player, idx: number) => index === idx ? player : indexPlayer === idx ? currentState.lineupPlayers[index] : ply);
            } else {
                state.lineupPlayers = currentState.lineupPlayers.map((ply: Player, idx: number) => index === idx ? player : ply);
            }
        },
        deletePlayer: (state, action) => {
            const index = action.payload;
            const currentState = current(state);
            state.lineupPlayers = currentState.lineupPlayers.map((ply: Player, idx: number) => index === idx ? objEmpty(idx) : ply);
        },
    },
})

export const {
    addPlayers,
    addPlayer,
    deletePlayer
} = stateSlice.actions

export default stateSlice.reducer
