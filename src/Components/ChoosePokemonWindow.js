import NestedWindow from "./utils/NestedWindow";
import classes from "../pages/HomePage.module.css";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
import choosePokemonSounds from "../assets/Audio/choosePokemonSounds.mp3";

const ChoosePokemonWindow = ({ onPokemonClick }) => {
  const navigate = useNavigate();

  const [playSound, { stop }] = useSound(choosePokemonSounds, {
    sprite: {
      bulbasaur: [4, 779],
      squirtle: [1853, 2543],
      pikachu: [850, 1004],
    },
    volume: 0.3,
  });

  const clickHandler = (e) => {
    onPokemonClick(e.target.id);
    //!update user with pokemon
    if (e.target.id !== "back-btn") {
      setTimeout(() => {
        navigate("/map");
      }, 700);
    }
  };

  const handleMouseEnter = (e) => {
    e.target.classList.add("scaleAvatar");

    if (e.target.id === "pikachu") {
      playSound({ id: "pikachu" });
    }
    if (e.target.id === "bulbasaur") {
      playSound({ id: "bulbasaur" });
    }
    if (e.target.id === "squirtle") {
      playSound({ id: "squirtle" });
    }
  };

  const handleMouseLeave = (e) => {
    stop();
    e.target.classList.remove("scaleAvatar");
  };

  return (
    <>
      <NestedWindow>
        <h2 className={classes.h1}>Choose your starting Pokémon</h2>
        <div className={classes.wrapper}>
          <div
            id="bulbasaur"
            className={`${classes.pokemonImg} ${classes.twentyOne}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clickHandler}
          />
          <div
            id="pikachu"
            className={`${classes.pokemonImg} ${classes.twenty}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clickHandler}
          />
          <div
            id="squirtle"
            className={`${classes.pokemonImg} ${classes.twentyTwo}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clickHandler}
          />
        </div>

        <button id="back-btn" className={classes.button} onClick={clickHandler}>
          Back
        </button>
      </NestedWindow>
    </>
  );
};

export default ChoosePokemonWindow;
