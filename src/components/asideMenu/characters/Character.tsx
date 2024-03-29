import { MdDeleteOutline, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Character } from "../../../interfaces/character";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setSelectedCharacter, toggleInactivateCharacter, toggleStarredCharacter } from "../../../store/slices/charactersSlice";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface CharacterProps {
  character: Character
}

export const CharacterCard = ({ character }: CharacterProps) => {

  const navigate = useNavigate()

  const selectedCharacter = useAppSelector(state => state.charactersSlice.selectedCharacter);
  const dispatch = useAppDispatch()

  const onSelect = () => {
    navigate(`characterDetail/${character.id}`)
    dispatch(setSelectedCharacter(character))
  }

  return (
    <div className={`flex items-center w-full px-4 py-3 ${(selectedCharacter && character.id === selectedCharacter.id) && 'bg-principal-100 rounded-lg'}`}>
      <div className="flex flex-1 items-center cursor-pointer" onClick={() => onSelect()}>
        <img src={character.image}
          alt={'Image of: ' + character?.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <div className="flex flex-col leading-tight flex-1">
          <span className="font-bold text-principal-50">{character.name}</span>
          <span>{character.species}</span>
        </div>
      </div>
      <div className="text-2xl cursor-pointer"
        onClick={() => {
          (character.isActivate && character.isStarred) && dispatch(toggleStarredCharacter(character))
          dispatch(toggleInactivateCharacter(character))
        }}>
        {
          character.isActivate ?
            (<MdDeleteOutline className="text-red-600" />) :
            (<IoMdCheckmarkCircleOutline className="text-principal-0 transition ease-in duration-100 hover:text-principal-200 hover:scale-110" />)
        }
      </div>
      {
        character.isActivate &&
        <div className="text-2xl cursor-pointer"
          onClick={() => { dispatch(toggleStarredCharacter(character)) }}>
          {
            character.isStarred ?
              (<MdFavorite className={`${character.isStarred && 'text-principal-200 transition ease-in duration-100 hover:text-principal-0 hover:scale-90'}`} />) :
              (<MdFavoriteBorder className="transition ease-in duration-100 hover:text-principal-200  hover:scale-110"/>)
          }
        </div>
      }
    </div>
  )
}
