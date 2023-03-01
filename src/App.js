import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BattlePage from "./pages/BattlePage";
import ErrorPage from "./pages/ErrorPage";
import GameMapPage from "./pages/GameMapPage";
import HomePage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "map", element: <GameMapPage /> },
      { path: "map/:locationID", element: <LocationPage /> },
      { path: "map/:locationID/:battleID", element: <BattlePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
