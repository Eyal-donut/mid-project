import { useLoggedUsersContext } from "../context/LoggedUserContext";
import { useState, useEffect } from "react";
import Modal from "./utils/Modal";
import PokemonCard from "./PokemonCard";
import classes from './UserPokemonsCarousell.module.css'

const UserPokemonsCarousel = ({header}) => {
  const [currentDisplayed, setCurrentDisplayed] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loggedUser } = useLoggedUsersContext();

  const userPokemonsArray = Object.values(loggedUser.pokemons);
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
      <Modal>
        <h2>{header}</h2>
        <PokemonCard name={currentDisplayed.name}
          level={currentDisplayed.level}
          strength={currentDisplayed.strength}
          defense={currentDisplayed.defense}
          imageUrl={currentDisplayed.imageUrl}
          //! attack1={currentDisplayed.attacks.attack1}
          //! attack2={currentDisplayed.attacks.attack2}
        />
        <div className={classes.arrowRight} id="right" onClick={clickHandler}></div>
        <div className={classes.arrowLeft} id="left" onClick={clickHandler}></div>
      
      </Modal>
    </>
  );
};
export default UserPokemonsCarousel;
