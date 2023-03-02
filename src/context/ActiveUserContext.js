import { useState, createContext, useContext } from "react";

const ActiveUserContext = createContext();

const ActiveUserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState({});

  return (
    <ActiveUserContext.Provider
      value={{
        activeUser,
        setActiveUser
      }}
    >
      {children}
    </ActiveUserContext.Provider>
  );
};

export const useActiveUSerContext = () => {
  return useContext(ActiveUserContext)
}

export {ActiveUserProvider}