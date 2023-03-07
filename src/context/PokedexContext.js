import { useState, createContext, useContext } from "react";

const PokedexContext = createContext();

const PokedexProvider = ({ children }) => {
  const [isPokedexDisplay, setPokedexDisplay] = useState(false);
  const [isPokedexUpdated, setPokedexUpdated] = useState(false);

  return (
    <PokedexContext.Provider
      value={{
        isPokedexDisplay,
        setPokedexDisplay,
        isPokedexUpdated,
        setPokedexUpdated
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export const usePokedexContext = () => {
  return useContext(PokedexContext)
}

export {PokedexProvider}