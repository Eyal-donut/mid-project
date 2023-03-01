import { Link } from "react-router-dom";

const LocationPage = () => {
  const battleID = 1;
  return (
    <>
      <h1>This is a location</h1>
      <Link to={`/map/:locationID/${battleID}`}>
        <button>Chosen Fight</button>
      </Link>
      <Link to=".." relative="path">
        <button>game map</button>
      </Link>
    </>
  );
};

export default LocationPage;
