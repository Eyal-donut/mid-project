import { Link } from "react-router-dom";

const BattlePage = () => {
  return (
    <>
      <h1>LET'S GOOOO, fight page</h1>
      <Link to=".." relative="path"><button>back to location</button></Link>
      <Link to="/map"><button>Game map</button></Link>
    </>
  );
};

export default BattlePage
