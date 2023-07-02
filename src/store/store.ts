import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

interface PlayersDataState {
  playersData: string[];
}

interface OverallDataState {
  overallData: any[];
}

interface TournamentDataState {
  tournamentData: {
    name: string;
    numberOfPlayers: number;
    tournamentSetupMode: string;
  };
}

// ["Nonso", "Amaka", "Evans", "Tinubu", "Tobey", "Rihanna", "Nedu", "Soft Paws"];

const tournamentDataSlice = createSlice({
  name: "tournamentData",
  initialState: {
    tournamentData: {
      name: "",
      numberOfPlayers: 0,
      tournamentSetupMode: "",
    },
  } as TournamentDataState,
  reducers: {
    setTournamentDataName: (state, action: PayloadAction<string>) => {
      state.tournamentData = {
        ...state.tournamentData,
        name: action.payload,
      };
    },
    setTournamentNumberOfPlayers: (state, action: PayloadAction<number>) => {
      state.tournamentData = {
        ...state.tournamentData,
        numberOfPlayers: action.payload,
      };
    },
    setTournamentSetupMode: (state, action: PayloadAction<string>) => {
      //action.payload should either be "new" or "existing"
      state.tournamentData = {
        ...state.tournamentData,
        tournamentSetupMode: action.payload,
      };
    },
  },
});

const playersDataSlice = createSlice({
  name: "playersData",
  initialState: {
    playersData: [],
  } as PlayersDataState,
  reducers: {
    setPlayersData: (state, action: PayloadAction<string[]>) => {
      state.playersData = action.payload;
    },
  },
});

const overallDataSlice = createSlice({
  name: "overallData",
  initialState: {
    overallData: [],
  } as OverallDataState,
  reducers: {
    setOverallData: (state, action: PayloadAction<any[]>) => {
      state.overallData = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  playersData: playersDataSlice.reducer,
  overallData: overallDataSlice.reducer,
  tournamentData: tournamentDataSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const playersDataActions = playersDataSlice.actions;
export const overallDataActions = overallDataSlice.actions;
export const tournamentDataActions = tournamentDataSlice.actions;
export default store;
