import charactersReducer, { addComment, setCharacters, setSelectedCharacter, toggleInactivateCharacter, toggleStarredCharacter } from '../../../src/store/slices/charactersSlice';
import { allCharacters, otherCharacters, starredCharacters } from '../../fixtures/asideFixture';

describe('charactersReducer', () => {

    it('should handle setCharacters', () => {
        // Arrange list of characters
        const charactersMock = allCharacters;
        const otherCharactersMock = otherCharacters;
        const starredCharactersMock = starredCharacters;

        const expectedAction = {
            type: setCharacters.type,
            payload: charactersMock,
        };

        // acts and assert calls the action and asserts the new values
        expect(charactersReducer({
            allCharacters: {},
            otherCharacters: [],
            starredCharacters: [],
        }, expectedAction)).toEqual({
            allCharacters: charactersMock,
            otherCharacters: otherCharactersMock,
            starredCharacters: starredCharactersMock,
        });
    });

    it('should toggle the isStarred property of the character and update otherCharacters and starredCharacters', () => {
        
        // Arrange the character list
        const charactersMock = allCharacters;

        const initialState = {
            allCharacters: {
                "1": charactersMock[6],
                "2": charactersMock[1],
            },
            otherCharacters: [allCharacters[2]],
            starredCharacters: [allCharacters[1]],
        };

        const expectedAction = {
            type: toggleStarredCharacter.type,
            payload: allCharacters[1],
        };

        // Acts calls the toggleStarredCharacter action
        const newState = charactersReducer(initialState, expectedAction);

        // Arrange, state of the first character
        expect(newState.allCharacters[1].isStarred).toBe(false);
        expect(newState.otherCharacters).toContainEqual(newState.allCharacters[1]);
        expect(newState.starredCharacters).not.toContainEqual(newState.allCharacters[1]);
    });

    it('should toggle the isActive property of the character and update otherCharacters and starredCharacters', () => {
        
        // Arrange list of characters
        const charactersMock = allCharacters;

        const initialState = {
            allCharacters: {
                "1": charactersMock[6],
                "2": charactersMock[1],
            },
            otherCharacters: [allCharacters[2]],
            starredCharacters: [allCharacters[1]],
        };

        const expectedAction = {
            type: toggleInactivateCharacter.type,
            payload: allCharacters[1],
        };

        // Act calls toggleInactivateCharacter action
        const newState = charactersReducer(initialState, expectedAction);

        // Assert activeStates, and characters in list
        expect(newState.allCharacters[1].isActivate).toBe(false);
        expect(newState.otherCharacters).not.toContainEqual(newState.allCharacters[1]);
        expect(newState.starredCharacters).toContainEqual(newState.allCharacters[1]);
    });
});

describe('setSelectedCharacter', () => {
    it('should set the selected character in the state', () => {
        // Arrange list of characters
        const charactersMock = allCharacters;

        const initialState = {
            allCharacters: {
                1: charactersMock[1],
                2: charactersMock[2],
            },
            otherCharacters: [],
            starredCharacters: [],
            selectedCharacter: null,
        };

        const expectedAction = {
            type: setSelectedCharacter.type,
            payload: allCharacters[1],
        };

        // Acts calls setSelectedCharacter action
        const newState = charactersReducer(initialState, expectedAction);

        // Assert selected character equals to character
        expect(newState.selectedCharacter).toEqual(allCharacters[1]);
    });

    it('should set null if no character is provided', () => {
        // Arrange characters lists
        const charactersMock = allCharacters;

        const initialState = {
            allCharacters: {
                1: charactersMock[1],
                2: charactersMock[2],
            },
            otherCharacters: [],
            starredCharacters: [],
            selectedCharacter: allCharacters[1],
        };

        const expectedAction = {
            type: setSelectedCharacter.type,
            payload: null,
        };

        // Acts calls setSelectedCharacter action
        const newState = charactersReducer(initialState, expectedAction);

        // Assert selectedCharacter null
        expect(newState.selectedCharacter).toBeNull();
    });
})


describe('addComment', () => {
    it('should add a comment to the specified character', () => {
        // Arrange characters list and comment
        const charactersMock = allCharacters;

        const initialState = {
            allCharacters: {
                1: charactersMock[1],
                2: charactersMock[2],
            },
            otherCharacters: [],
            starredCharacters: [],
        };

        const expectedAction = {
            type: addComment.type,
            payload: { character: { id: 1 }, comment: 'This is a comment' },
        };

        // Act calls the addComment action
        const newState = charactersReducer(initialState, expectedAction);

        // Asserts new comment added
        expect(newState.allCharacters[1].comments).toContain('This is a comment');
    });

    it('should add a comment to the specified character', () => {
        // Arrange character list and comment
        const charactersMock = allCharacters;

        const initialState = {
            allCharacters: {
                1: charactersMock[1],
                2: charactersMock[2],
            },
            otherCharacters: [],
            starredCharacters: [],
        };

        const expectedAction = {
            type: addComment.type,
            payload: { character: { id: 1 }, comment: 'This is a comment' },
        };

        // Acts calls addComment action
        const newState = charactersReducer(initialState, expectedAction);

        // Asserts new comment should not to be on another character
        expect(newState.allCharacters[2].comments).toEqual([]);
    });
})
