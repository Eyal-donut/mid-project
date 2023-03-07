import { useLoggedUsersContext } from "../context/LoggedUserContext";
import { useState } from "react";
import Modal from "./utils/Modal";

const UserPokemonsCarousel = () => {
  const [currentDisplayed, setCurrentDisplayed] = useState({});

  const { loggedUser } = useLoggedUsersContext();

  const userPokemonsArray = Object.values(loggedUser.pokemons);

  const clickHandler = (e) => {
    console.log(userPokemonsArray)


    if (e.target.id === "right") {
    } else {
    }
  };

  return (
    <>
      <Modal>
        <h2>Your Pokemons</h2>
        <button id="right" onClick={clickHandler}>right</button>
        <button id="left" onClick={clickHandler}>left</button>
        
      </Modal>
    </>
  );
};
export default UserPokemonsCarousel;
