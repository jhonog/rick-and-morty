import { CharacterFilter, SpecieFilter, StatusFilter } from "./filters";

export const initialFilterState = {
    Character: CharacterFilter.All,
    Specie: SpecieFilter.All,
    Gender: null,
    CharacterStatus: null,
    Status: StatusFilter.Active
}