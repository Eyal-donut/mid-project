import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { locationsArray } from "../Data/LocationsData";
import { useLocationContext } from "../context/CurrentLocationContext";

const LocationPage = () => {
  const {setCurrentLocation} = useLocationContext()
  const params = useParams()

  useEffect(() => {
    const locationByID = locationsArray.find((location)=> location.id === params.locationID)
    setCurrentLocation(locationByID)
  }, [params.locationID, setCurrentLocation]);

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
