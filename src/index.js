import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./variables.css";
import App from "./App";
import { LocationProvider } from "./context/CurrentLocationContext";
import { EnemiesProvider } from "./context/EnemiesContext ";
import { UsersProvider } from "./context/UsersContext";
import { LoggedUserProvider } from "./context/LoggedUserContext";
import { CurrentPokemonProvider } from "./context/CurrentPokemonContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrentPokemonProvider>
      <LoggedUserProvider>
        <UsersProvider>
          <EnemiesProvider>
            <LocationProvider>
              <App />
            </LocationProvider>
          </EnemiesProvider>
        </UsersProvider>
      </LoggedUserProvider>
    </CurrentPokemonProvider>
  </React.StrictMode>
);
