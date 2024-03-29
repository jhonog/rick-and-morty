import { MdOutlineSearch } from 'react-icons/md'
import { GiSettingsKnobs } from 'react-icons/gi';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setSelectedFilters } from '../../../store/slices/filtersSlice';

interface SearchProps {
    setOpenFilters: React.Dispatch<React.SetStateAction<boolean>>
    openFilters: boolean
}

export const Search = ({
    setOpenFilters,
    openFilters
}: SearchProps) => {

    const selectedFilters = useAppSelector(state => state.filtersSlice.selectedFilters)
    const dispatch = useAppDispatch()

    const setFilterText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedFilters({ ...selectedFilters, name: event.target.value }))
    }

    return (
        <div className='flex items-center justify-between w-full h-12 px-4 rounded-lg bg-principal-250'>
            <div className='flex items-center'>
                <MdOutlineSearch className='text-3xl' />
                <input
                    onChange={(event) => setFilterText(event)}
                    placeholder='Search or filter results'
                    className='ml-1 flex w-full items-center animate-none focus:outline-none active:outline-none placeholder-principal-0 text-sm bg-principal-250'
                    type="text"
                />
            </div>
            <button
                onClick={() => setOpenFilters(prev => !prev)}
                className={`
                    p-1 rounded-lg
                    transition ease-in duration-100 hover:bg-principal-100  hover:scale-110
                    ${openFilters && 'bg-principal-100 scale-110'}
                `}
            >
                <GiSettingsKnobs className={`text-2xl text-principal-150 hover:text-principal-300 ${openFilters && 'text-principal-300'}`} />
            </button>
        </div>
    )
}
