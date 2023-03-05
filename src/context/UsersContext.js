import { useState, createContext, useContext } from "react";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState({});
  const [keys, setKeys] = useState([])

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        keys,
        setKeys,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  return useContext(UsersContext)
}

export {UsersProvider}