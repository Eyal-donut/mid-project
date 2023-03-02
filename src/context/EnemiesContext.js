// import { useState, createContext, useContext } from "react";

// const EnemiesContext = createContext();

// const EnemiesProvider = ({ children }) => {
//   const [currentEnemy, setCurrentEnemy] = useState({});
//   const [enemiesArray, setEnemiesArray] = useState([]);

//   return (
//     <EnemiesContext.Provider
//       value={{
//         currentEnemy,
//         setCurrentEnemy,
//         enemiesArray,
//         setEnemiesArray
//       }}
//     >
//       {children}
//     </EnemiesContext.Provider>
//   );
// };

// export const useEnemiesContext = () => {
//   return useContext(EnemiesContext)
// }

// export {EnemiesProvider}