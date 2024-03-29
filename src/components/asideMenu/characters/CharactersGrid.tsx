import { MdOutlineSortByAlpha } from 'react-icons/md';
import { Character } from '../../../interfaces/character';
import { CharacterCard } from './Character'
import { useEffect, useState } from 'react';

interface CharactersGridProps {
    name: string;
    characters: Character[];
}

export const CharactersGrid = ({ name, characters }: CharactersGridProps) => {

    const [isSorted, setIsSorted] = useState(true);
    const [sortedCharacterList, setSortedCharacterList] = useState(characters)

    useEffect(() => {
        if (isSorted) {
            setSortedCharacterList([...characters].sort((a, b) => a.name.localeCompare(b.name)));
        } else {
            setSortedCharacterList([...characters].sort((a, b) => b.name.localeCompare(a.name)));
        }
    }, [characters, isSorted])

    return (
        <>
            <div className='flex items-center px-4 py-4 border-b'>
                <div className='flex flex-1'>
                    <span className='text-sm font-semibold'>{name}</span>
                    <span className='text-sm font-semibold ml-1'>({sortedCharacterList?.length})</span>
                </div>
                <button className='p-1 rounded-lg transition ease-in duration-100 hover:bg-principal-100  hover:scale-110' onClick={() => setIsSorted(prev => !prev)}>
                    <MdOutlineSortByAlpha className='text-2xl text-principal-0' />
                </button>
            </div>
            <div className='grid grid-col-1 divide-y py-4'>
                {sortedCharacterList?.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </>
    )
}
