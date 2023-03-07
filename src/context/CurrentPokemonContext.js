import { useState, createContext, useContext } from "react";

const CurrentPokemonContext = createContext();

const CurrentPokemonProvider = ({ children }) => {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [isChoosePokemon, setIsChoosePokemon] = useState(false)

  return (
    <CurrentPokemonContext.Provider
      value={{
        currentPokemon,
        setCurrentPokemon,
        isChoosePokemon,
        setIsChoosePokemon
      }}
    >
      {children}
    </CurrentPokemonContext.Provider>
  );
};

export const useCurrentPokemonContext = () => {
  return useContext(CurrentPokemonContext)
}

export {CurrentPokemonProvider}