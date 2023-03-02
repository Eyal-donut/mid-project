import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./variables.css";
import App from "./App";
import { LocationProvider } from "./context/CurrentLocationContext";
import { EnemiesProvider } from "./context/EnemiesContext";
import { ActiveUserProvider } from "./context/ActiveUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ActiveUserProvider>
      {/* <EnemiesProvider> */}
        <LocationProvider>
          <App />
        </LocationProvider>
      {/* </EnemiesProvider> */}
    </ActiveUserProvider>
  </React.StrictMode>
);
