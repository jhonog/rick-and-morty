import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterFilter, SpecieFilter, StatusFilter } from '../../utils/filters';

interface FilterState {
    selectedFilters: { [filterType: string]: string | null; }
}

const initialState: FilterState = {
    selectedFilters: {
        Character: CharacterFilter.All,
        Specie: SpecieFilter.All,
        Gender: null,
        CharacterStatus: null,
        Status: StatusFilter.Active,
        name: ''
    }
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSelectedFilters(state, action: PayloadAction<{ [filterType: string]: string | null; }>) {
            state.selectedFilters = action.payload;
        },
        cleanFilters(state) {
            state.selectedFilters = {
                ...initialState.selectedFilters,
                name: state.selectedFilters.name,
            };
        }
    }
});

export const { setSelectedFilters, cleanFilters } = filtersSlice.actions

export default filtersSlice.reducer