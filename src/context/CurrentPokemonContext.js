import { useState, createContext, useContext } from "react";

const CurrentPokemonContext = createContext();

const CurrentPokemonProvider = ({ children }) => {
  const [currentPokemon, setCurrentPokemon] = useState({});

  return (
    <CurrentPokemonContext.Provider
      value={{
        currentPokemon,
        setCurrentPokemon,
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