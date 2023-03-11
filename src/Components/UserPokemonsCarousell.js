import { useState, useEffect } from "react";
import Modal from "./utils/Modal";
import PokedexModal from "./utils/PokedexModal";
import PokemonCard from "./PokemonCard";
import classes from "./UserPokemonsCarousell.module.css";
import { usePokedexContext } from "../context/PokedexContext";

const UserPokemonsCarousel = ({ header, children }) => {
  const [currentDisplayed, setCurrentDisplayed] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const { setPokedexDisplay } = usePokedexContext();

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

  useEffect(() => {
    setCurrentDisplayed(userPokemonsArray[currentIndex]);
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
        {children}
        <button
          onClick={() => {
            setPokedexDisplay(false);
          }}
        >
          Back
        </button>
      </PokedexModal>
    </>
  );
};
export default UserPokemonsCarousel;
