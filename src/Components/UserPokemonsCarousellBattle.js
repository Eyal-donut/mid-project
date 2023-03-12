import { useState, useEffect } from "react";
import PokedexModal from "./utils/PokedexModal";
import PokemonCard from "./PokemonCard";
import classes from "./UserPokemonsCarousell.module.css";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";

const UserPokemonsCarouselBattle = ({ header, onBtnClick }) => {
  const [currentDisplayed, setCurrentDisplayed] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setIsChoosePokemon, setCurrentPokemon } = useCurrentPokemonContext();

  const localStorageLoggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const userPokemonsArray = Object.values(localStorageLoggedUser.pokemons);
  const lastIndex = userPokemonsArray.length - 1;

  const clickHandler = (e) => {
    if (e.target.id === "right") {
      if (currentIndex < lastIndex) {
        setCurrentIndex((prev) => prev + 1);
      } else setCurrentIndex(0);
    }
    if (e.target.id === "left") {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else setCurrentIndex(lastIndex);
    }
  };

  const HandleChoosePokemon = () => {
    setIsChoosePokemon(false);
    setCurrentPokemon(currentDisplayed);
    onBtnClick();
  };

  useEffect(() => {
    setCurrentDisplayed(userPokemonsArray[currentIndex]);
    // eslint-disable-next-line 
  }, [currentIndex, setCurrentDisplayed]);

  return (
    <>
      <PokedexModal>
        <h2>{header}</h2>
        <PokemonCard
          name={currentDisplayed.name}
          level={currentDisplayed.level}
          strength={currentDisplayed.strength}
          defense={currentDisplayed.defense}
          imageUrl={currentDisplayed.imageUrl}
          attackOne={currentDisplayed.attacks?.attackOne}
          attackTwo={currentDisplayed.attacks?.attackTwo}
        />
        <div
          className={classes.arrowRight}
          id="right"
          onClick={clickHandler}
        ></div>
        <div
          className={classes.arrowLeft}
          id="left"
          onClick={clickHandler}
        ></div>
        <div className={classes.buttonsWrapper}>
          <button className={classes.button} onClick={HandleChoosePokemon}>
            I choose you!
          </button>
          <button
            className={classes.button}
            onClick={() => {
              setIsChoosePokemon(false);
            }}
          >
            Back
          </button>
        </div>
      </PokedexModal>
    </>
  );
};
export default UserPokemonsCarouselBattle;
