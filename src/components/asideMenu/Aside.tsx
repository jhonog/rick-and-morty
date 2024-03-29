import { useEffect, useState } from 'react';
import { CharactersGrid } from './characters/CharactersGrid';
import { Character } from '../../interfaces/character';
import { useAppSelector } from '../../store/store';
import { Search } from './filters/Search';
import { FiltersModal } from './filters/FiltersModal';
import { CharacterFilter, SpecieFilter, StatusFilter } from '../../utils/filters';
import { initialFilterState } from '../../utils/constants';


export const Aside = () => {

    // Gets the data from the store.
    const { otherCharacters, starredCharacters } = useAppSelector(state => state.charactersSlice);
    const { selectedFilters } = useAppSelector(state => state.filtersSlice);

    // Aux list for character list, it helps to keep the main list clean.
    const [othersCharactersList, setOthersCharactersList] = useState<Character[]>([])
    const [starredCharactersList, setStarredCharactersList] = useState<Character[]>([])

    const [filtersCount, setFiltersCount] = useState(0);
    const [validationFilters, setValidationFilters] = useState(false);

    const [openFilters, setOpenFilters] = useState(false);

    useEffect(() => {
        setOthersCharactersList(applyFilters(otherCharacters));
    }, [otherCharacters, selectedFilters])

    useEffect(() => {
        setStarredCharactersList(applyFilters(starredCharacters));
    }, [starredCharacters, selectedFilters])

    // Listener for filters, updates validations state and filters counter.
    useEffect(() => {
        let counter = 0;

        const characterFilter = selectedFilters.Character != initialFilterState.Character
        const specieFilter = selectedFilters.Specie != initialFilterState.Specie
        const genderFilter = selectedFilters.Gender != initialFilterState.Gender
        const characterStatus = selectedFilters.CharacterStatus != initialFilterState.CharacterStatus
        const statusFilter = selectedFilters.Character != initialFilterState.Character

        characterFilter && counter++;
        specieFilter && counter++;
        genderFilter && counter++;
        characterStatus && counter++;
        statusFilter && counter++;

        setValidationFilters(characterFilter || specieFilter || genderFilter || characterStatus || statusFilter);
        setFiltersCount(counter);
    }, [selectedFilters])

    // Apply the selected filters.
    const applyFilters = (characters: Character[]) => {
        return characters.filter((character) => {
            return (
                (character.name.toLowerCase().includes(selectedFilters.name ? selectedFilters.name?.toLocaleLowerCase() : '')) &&
                (selectedFilters.Character === CharacterFilter.All || (selectedFilters.Character === CharacterFilter.Starred && character.isStarred) || (selectedFilters.Character === CharacterFilter.Others && !character.isStarred)) &&
                (selectedFilters.Specie === SpecieFilter.All || character.species === selectedFilters.Specie) &&
                (selectedFilters.Gender === null || character.gender === selectedFilters.Gender) &&
                (selectedFilters.CharacterStatus === null || character.status === selectedFilters.CharacterStatus) &&
                (selectedFilters.Status === StatusFilter.All || (selectedFilters.Status === StatusFilter.Active && character.isActivate) || (selectedFilters.Status === StatusFilter.Inactive && !character.isActivate))
            );
        })
    }

    return (
        <div className='pt-11 px-6 w-full text-principal-0'>
            <h1 className='text-2xl font-bold text-principal-50'>Rick and Morty list</h1>

            <div className='py-4 relative'>
                <Search
                    openFilters={openFilters}
                    setOpenFilters={setOpenFilters}
                />
                <div className={`fixed md:static inset-0 z-50 overflow-y-auto ${!openFilters && 'hidden'}`}>
                    <FiltersModal
                        openFilters={openFilters}
                        setOpenFilters={setOpenFilters}
                    />
                </div>
            </div>

            <div className={`flex items-center justify-between px-4 ${validationFilters ? 'block' : 'hidden'}`}>
                <span className={'text-principal-350 font-bold'}>
                    {starredCharactersList.length + othersCharactersList.length} Results
                </span>
                <span className='bg-principal-200 bg-opacity-20 px-3 py-1 rounded-full text-sm text-principal-400 font-bold'>
                    {filtersCount} Filter
                </span>
            </div>

            {
                starredCharactersList.length > 0 &&
                <CharactersGrid name='STARRED CHARACTERS' characters={starredCharactersList} />
            }
            {
                othersCharactersList.length > 0 &&
                <CharactersGrid name='CHARACTERS' characters={othersCharactersList} />
            }
        </div>
    )
}
