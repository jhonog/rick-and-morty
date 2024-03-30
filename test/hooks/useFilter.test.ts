
import { Character } from '../../src/interfaces/character';
import { otherCharacters, starredCharacters } from '../fixtures/asideFixture';
import { renderHook } from '@testing-library/react-hooks';
import { useFilters } from '../../src/hooks/useFilter';


describe('applyFilters function', () => {
    const { result } = renderHook(() => useFilters());

    const mockOtherCharacters: Character[] = otherCharacters;
    const mockStarredCharacters: Character[] = starredCharacters;

    test('Filters otherCharacters correctly based on selected filters', () => {
        // Arrange filters
        const selectedFilters = {
            name: 'Rick',
            Character: 'All',
            Specie: 'Human',
            Gender: 'Male',
            CharacterStatus: 'Alive',
            Status: 'Active',
        };

        // Acts Apply filters
        const filteredCharacters = result.current.filterCharacters(mockOtherCharacters, selectedFilters);

        // Assert
        expect(filteredCharacters).toHaveLength(1);
        expect(filteredCharacters[0].name).toBe('Rick Sanchez');
        expect(filteredCharacters[0].species).toBe('Human');
        expect(filteredCharacters[0].gender).toBe('Male');
        expect(filteredCharacters[0].status).toBe('Alive');
        expect(filteredCharacters[0].isStarred).toBe(false);
        expect(filteredCharacters[0].isActivate).toBe(true);
    });

    test('Filters otherCharacters correctly based on selected filters', () => {
        // Arrange filters
        const selectedFilters = {
            name: 'Abadango',
            Character: 'All',
            Specie: 'Alien',
            Gender: 'Female',
            CharacterStatus: 'Alive',
            Status: 'Active',
        };

        // Acts Apply filters
        const filteredCharacters = result.current.filterCharacters(mockStarredCharacters, selectedFilters);

        // Assert
        expect(filteredCharacters).toHaveLength(1);
        expect(filteredCharacters[0].name).toBe('Abadango Cluster Princess');
        expect(filteredCharacters[0].species).toBe('Alien');
        expect(filteredCharacters[0].gender).toBe('Female');
        expect(filteredCharacters[0].status).toBe('Alive');
        expect(filteredCharacters[0].isStarred).toBe(true);
        expect(filteredCharacters[0].isActivate).toBe(true);
    });
});


