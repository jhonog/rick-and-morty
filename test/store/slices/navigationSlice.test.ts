import navigationReducer, { setNavigationParam } from "../../../src/store/slices/navigationSlice";


describe('navigation slice', () => {
    test('should set navigation param correctly', () => {
        // Arrange navigation state
        const initialState = {
            navigationParam: ''
        };
        const actionPayload = 'someValue';

        const expectedAction = {
            type: setNavigationParam.type,
            payload: actionPayload,
        };

        // Acts call setNavigationParam action
        const state = navigationReducer(initialState, expectedAction);

        // Assert new navigation state
        expect(state.navigationParam).toEqual(actionPayload);
    });
});
