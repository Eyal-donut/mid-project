import { useState, createContext, useContext } from "react";

const LoggedUsersContext = createContext();

const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [loggedUserKey, setLoggedUserKey] = useState({});

  return (
    <LoggedUsersContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        loggedUserKey,
        setLoggedUserKey
      }}
    >
      {children}
    </LoggedUsersContext.Provider>
  );
};

export const useLoggedUsersContext = () => {
  return useContext(LoggedUsersContext)
}

export {LoggedUserProvider}