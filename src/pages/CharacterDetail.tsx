import { useEffect, useState } from "react";
import { CharacterSummary } from "../components/characterDetail/CharacterSummary";
import { useAppDispatch, useAppSelector } from "../store/store"
import { useNavigate, useParams } from "react-router-dom";
import { CommentModal } from "../components/characterDetail/CommentModal";
import { CommentCard } from "../components/characterDetail/CommentCard";
import { setNavigationParam } from "../store/slices/navigationSlice";
import { IoMdArrowBack } from "react-icons/io";
import { setSelectedCharacter } from "../store/slices/charactersSlice";

export const CharacterDetail = () => {
  const dispatch = useAppDispatch()

  const { idCharacter } = useParams();

  const navigate = useNavigate()

  const { allCharacters, starredCharacters, selectedCharacter } = useAppSelector(state => state.charactersSlice);

  const isFavorite = starredCharacters.some(character => character.id === selectedCharacter!.id);

  const currentCharacter = selectedCharacter && allCharacters[selectedCharacter.id]

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!selectedCharacter) {
      navigate('/')
    } else {
      idCharacter && dispatch(setNavigationParam(idCharacter));
    }
  }, [])

  const onGoBack = () => {
    dispatch(setSelectedCharacter(null));
    dispatch(setNavigationParam(''));
    navigate('/');
  }

  return (
    <>
      {selectedCharacter &&
        <div className="flex flex-wrap h-min justify-center w-full text-principal-0">
          <div className="py-4 w-4/5 block md:hidden">
            <IoMdArrowBack className="text-3xl text-principal-150 cursor-pointer" onClick={() => onGoBack()} />
          </div>
          <CharacterSummary
            isFavorite={isFavorite}
            selectedCharacter={selectedCharacter!}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />

          {currentCharacter && currentCharacter?.comments?.length > 0 &&
            <div className="flex flex-wrap h-fit w-4/5 py-4">
              <p className="text-principal-50 font-bold w-full">Comments ({currentCharacter?.comments?.length})</p>
              <div className="grid grid-cols-1 divide-y w-full">
                {
                  currentCharacter!.comments.map((comment, index) => (
                    <CommentCard key={index} index={index} comment={comment} />
                  ))
                }
              </div>
            </div>
          }

          {
            openModal &&
            (<CommentModal setOpenModal={setOpenModal} selectedCharacter={selectedCharacter} />)
          }
        </div>
      }
    </>
  )
}
