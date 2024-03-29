import { Route, Routes } from "react-router-dom";
import { CharacterDetail } from "../pages/CharacterDetail";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/characterDetail/:idCharacter" element={<CharacterDetail />} />
      <Route path="/*" element={<></>} />
    </Routes>
  );
};
