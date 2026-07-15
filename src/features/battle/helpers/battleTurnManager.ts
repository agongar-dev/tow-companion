export type TurnState = {
    currentTurn: number;
    activeTeamId: string;
    activePlayerId: string;
};


export function createInitialTurnState(teamId: string, playerId: string): TurnState {
    return {
        currentTurn: 1,
        activeTeamId: teamId,
        activePlayerId: playerId,
    };
}

export function nextTurn(state: TurnState): TurnState {
    return {
        ...state,
        currentTurn: state.currentTurn + 1,
    };
}

export function setActivePlayer(state: TurnState, playerId: string): TurnState {
    return {
        ...state,
        activePlayerId: playerId,
    };
}

export function setActiveTeam(state: TurnState, teamId: string): TurnState {
    return {
        ...state,
        activeTeamId: teamId,
    };
}