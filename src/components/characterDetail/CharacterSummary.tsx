import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { Character } from '../../interfaces/character'
import { useAppDispatch } from '../../store/store'
import { toggleStarredCharacter } from '../../store/slices/charactersSlice'

interface characterSummaryProps {
    selectedCharacter: Character
    isFavorite: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    openModal: boolean
}

export const CharacterSummary = ({ isFavorite, selectedCharacter, setOpenModal, openModal }: characterSummaryProps) => {

    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-wrap h-fit justify-center w-4/5 md:pt-11">

            <div className="flex w-full items-end -space-x-5 overflow-hidden">
                <img
                    src={selectedCharacter?.image}
                    alt={'Image of: ' + selectedCharacter?.name}
                    className="w-20 h-20 rounded-full inline-block ring-2 ring-white"
                />

                <div onClick={() => dispatch(toggleStarredCharacter(selectedCharacter))} className="text-2xl p-0.5 bg-white rounded-full inline-block ring-2 ring-white cursor-pointer">
                    {
                        isFavorite ?
                            (<MdFavorite className={` ${isFavorite && 'text-principal-200 transition ease-in duration-100 hover:text-principal-0 hover:scale-90'}`} />) :
                            (<MdFavoriteBorder className='transition ease-in duration-100 hover:text-principal-200  hover:scale-110' />)
                    }
                </div>
            </div>

            <div className='flex flex-wrap items-center w-full'>
                <span className='text-2xl font-bold text-principal-50 pr-4 py-4'>{selectedCharacter.name}</span>
                <button
                    className={`
                    font-bold p-2 rounded-md
                    ${openModal ? 'bg-principal-100 text-principal-300' : 'bg-principal-250  text-principal-0'}
                    transition ease-in duration-150 hover:bg-principal-100 hover:text-principal-300 `}
                    onClick={() => setOpenModal(prev => !prev)}
                >
                    Add Comment
                </button>
            </div>

            <div className='grid grid-col-1 divide-y w-full border-b'>
                <div className='flex flex-col w-full py-4'>
                    <span className='font-bold text-principal-50'>Specie</span>
                    <span>{selectedCharacter.species}</span>
                </div>
                <div className='flex flex-col w-full py-4'>
                    <span className='font-bold text-principal-50'>Status</span>
                    <span>{selectedCharacter.status}</span>
                </div>
                <div className='flex flex-col w-full py-4'>
                    <span className='font-bold text-principal-50'>Gender</span>
                    <span>{selectedCharacter.gender}</span>
                </div>
            </div>


        </div>
    )
}
