import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Home Page - it's Pokemon BIAAATCH</h1>
      <Link to="map/">
        <button>Game map Page</button>
      </Link>
    </>
  );
};
export default HomePage;
