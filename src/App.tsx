import { useQuery } from "@apollo/client"
import { MainLayout } from "./layouts/MainLayout"
import { useAppDispatch } from "./store/store";
import { CHARACTERS_QUERY } from "./api/graphQuerys";
import { useEffect } from "react";
import { setCharacters } from "./store/slices/charactersSlice";
import { Character } from "./interfaces/character";
import loadingImage from '../src/assets/images/loadScreen.jpg';


function App() {
  const dispatch = useAppDispatch();
  
  const { loading, data } = useQuery(CHARACTERS_QUERY);

  useEffect(() => {
    if (data) {
      // Gets the results data and map to Character interface
      const allCharacters: Character[] = data?.characters?.results.map((character: Character) => ({
        ...character,
        isStarred: false,
        isActivate: true,
        comments: []
      }))

      // Convert the list into a Key Value object for accessibility 
      const charactersMap: { [key: string]: Character } = [...allCharacters].reduce<{ [key: string]: Character }>((acc, character) => {
        acc[character.id] = character;
        return acc;
      }, {});

      dispatch(setCharacters(charactersMap))
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen">
      {
        loading ?
          (<div className="flex flex-col justify-center items-center h-screen w-screen bg-[#262C3A]">
            <img src={loadingImage} alt="" className="object-scale-down h-2/3 w-2/3 md:h-1/2 md:w-1/2" />
            <span className="animate-bounce text-principal-200 text-2xl -mt-10 md:-mt-5 md:text-3xl">Cargando...</span>
          </div>) :
          (<MainLayout />)
      }
    </div>
  )
}

export default App
