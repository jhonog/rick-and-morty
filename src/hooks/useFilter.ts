import { Character } from "../interfaces/character";
import { CharacterFilter, SpecieFilter, StatusFilter } from "../utils/filters";

export const useFilters = () => {

    const filterCharacters = (characters: Character[], selectedFilters: {
        [filterType: string]: string | null;
    }) => {
        return characters.filter((character) => {
            return (
                (character.name.toLowerCase().includes(selectedFilters.name ? selectedFilters.name?.toLocaleLowerCase() : '')) &&
                (selectedFilters.Character === CharacterFilter.All || (selectedFilters.Character === CharacterFilter.Starred && character.isStarred) || (selectedFilters.Character === CharacterFilter.Others && !character.isStarred)) &&
                (selectedFilters.Specie === SpecieFilter.All || character.species === selectedFilters.Specie) &&
                (selectedFilters.Gender === null || character.gender === selectedFilters.Gender) &&
                (selectedFilters.CharacterStatus === null || character.status === selectedFilters.CharacterStatus) &&
                (selectedFilters.Status === StatusFilter.All || (selectedFilters.Status === StatusFilter.Active && character.isActivate) || (selectedFilters.Status === StatusFilter.Inactive && !character.isActivate))
            );
        });

    }

    return {
        filterCharacters
    }
}