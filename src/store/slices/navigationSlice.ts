import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    navigationParam: string
}

const initialState: InitialState = {
    navigationParam: '',
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigationParam(state, action: PayloadAction<string>) {
            state.navigationParam = action.payload;
        }
    }
});

export const { setNavigationParam } = navigationSlice.actions

export default navigationSlice.reducer