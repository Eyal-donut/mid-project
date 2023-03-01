import { Link } from "react-router-dom";

const GameMapPage = () => {
  const locationID = 1;
  return (
    <>
      <h1>Game Map</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to={`/map/${locationID}`}>
        <button>Chosen location</button>
      </Link>
    </>
  );
};
export default GameMapPage;
