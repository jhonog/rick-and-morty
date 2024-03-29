import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character } from '../../interfaces/character';

interface CharactersState {
    allCharacters: { [key: string]: Character };
    otherCharacters: Character[];
    starredCharacters: Character[];
    selectedCharacter?: Character | null;
}

const initialState: CharactersState = {
    allCharacters: {},
    otherCharacters: [],
    starredCharacters: [],
}

// Character slice for global state management
const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCharacters(state, action: PayloadAction<{ [key: string]: Character }>) {
            const allCharacters = action.payload;
            state.allCharacters = allCharacters;
            state.otherCharacters = Object.values(allCharacters).filter(character => !character.isStarred)
            state.starredCharacters = Object.values(allCharacters).filter(character => character.isStarred)
        },
        // Toggle the character to starred and other way around
        toggleStarredCharacter(state, action: PayloadAction<Character>) {
            const character = action.payload;
            const { id } = character;

            state.allCharacters[id].isStarred = !state.allCharacters[id].isStarred;

            const characters = Object.values(state.allCharacters);

            const otherCharacters = characters.filter(character => !character.isStarred);
            state.otherCharacters = otherCharacters;

            const starredCharacters = characters.filter(character => character.isStarred);
            state.starredCharacters = starredCharacters;
        },
        // Toggle the character to inactive and other way around
        toggleInactivateCharacter(state, action: PayloadAction<Character>) {
            const character = action.payload;
            const { id } = character;

            state.allCharacters[id].isActivate = !state.allCharacters[id].isActivate;

            const characters = Object.values(state.allCharacters);

            const otherCharacters = characters.filter(character => !character.isStarred);
            state.otherCharacters = otherCharacters;

            const starredCharacters = characters.filter(character => character.isStarred);
            state.starredCharacters = starredCharacters;
        },
        setSelectedCharacter(state, action: PayloadAction<Character | null>) {
            state.selectedCharacter = action.payload && state.allCharacters[action.payload.id];
        },
        addComment(state, action: PayloadAction<{ character: Character; comment: string; }>) {
            const { character, comment } = action.payload;
            const { id } = character;
            state.allCharacters[id].comments.push(comment);
        },

    }
});

export const { setCharacters, toggleStarredCharacter, setSelectedCharacter, addComment, toggleInactivateCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;