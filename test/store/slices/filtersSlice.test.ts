import filterReducer, { setSelectedFilters } from "../../../src/store/slices/filtersSlice";

describe('filters slice', () => {
    test('should set selected filters correctly', () => {
        // Arrange filters
        const initialState = {
            selectedFilters: {
                Character: 'All',
                Specie: 'All',
                Gender: null,
                CharacterStatus: null,
                Status: 'Active',
                name: ''
            }
        };
        const actionPayload = {
            Character: 'Human',
            Specie: 'Alien',
            Gender: 'Male',
            CharacterStatus: 'Alive',
            Status: 'Active',
            name: 'Rick'
        };

        const expectedAction = {
            type: setSelectedFilters.type,
            payload: actionPayload,
        };

        // Acts calls setSelectedFilters action

        const newState = filterReducer(initialState, expectedAction);

        // Assert new filters state
        expect(newState.selectedFilters).toEqual(actionPayload);
    });
});