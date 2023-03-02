import { useState, createContext, useContext } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState([]);

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  return useContext(LocationContext)
}

export {LocationProvider}