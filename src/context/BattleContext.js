import { useState, createContext, useContext } from "react";

const BattleContext = createContext();

const BattleProvider = ({ children }) => {
  const [isBattleStarted, setIsBattleStarted] = useState(false);

  return (
    <BattleContext.Provider
      value={{
        isBattleStarted,
        setIsBattleStarted,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

export const useBattleContext = () => {
  return useContext(BattleContext)
}

export {BattleProvider}