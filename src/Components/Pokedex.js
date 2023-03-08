import classes from "./Pokedex.module.css";
import { usePokedexContext } from "../context/PokedexContext";
import UserPokemonsCarousel from "./UserPokemonsCarousell";

const Pokedex = () => {
  const {
    isPokedexDisplay,
    setPokedexDisplay,
    isPokedexUpdated,
    setPokedexUpdated,
  } = usePokedexContext();

  const clickHandler = () => {
    setPokedexDisplay(true);
    setPokedexUpdated(false);
  };

  return (
    <>
      {isPokedexDisplay && (
        <UserPokemonsCarousel/>
      )}
      {!isPokedexDisplay && (
        <div className={classes.pokedexLogoWrapper} onClick={clickHandler}>
          <div className={classes.pokedexLogo}>
            {isPokedexUpdated && (
              <div className={classes.updateLogo}>
                <div className={classes.exclamationMark} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Pokedex;
