import NestedWindow from "./utils/NestedWindow";
import classes from "../pages/HomePage.module.css";
import { useRef, useState } from "react";
import { useUsersContext } from "../context/UsersContext";
import { useLoggedUsersContext } from "../context/LoggedUserContext";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";

const LoginWindow = ({ onBtnClick }) => {
  const [isLoginFailed, setLoginFailed] = useState(false);

  const { users } = useUsersContext();
  const { loggedUserKEy ,setLoggedUserKey, setLoggedUser } = useLoggedUsersContext();
  const {setCurrentPokemon} = useCurrentPokemonContext()

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const clickHandler = (e) => {
    if (e.target.id === "login-btn") {
      for (const key in users) {
        if (
          users[key].password === passwordRef.current.value &&
          users[key].userName === userNameRef.current.value
        ) {
          setLoggedUserKey(key);
          setLoggedUser(users[key])
          setCurrentPokemon(users[key].pokemons.first)
          localStorage.setItem("loggedUserKey", JSON.stringify(key))
          localStorage.setItem("loggedUser", JSON.stringify(users[key]))
          localStorage.setItem("currentPokemon", JSON.stringify(users[key].pokemons.first))
          onBtnClick(e.target.id)
        } else {
          setLoginFailed(true);
        }
      }
    }
    if (e.target.id === "back-btn") {
      onBtnClick(e.target.id);
    }
  };

  return (
    <>
      <NestedWindow>
        <h2 className={classes.h1}>Login</h2>
        <form>
          <ul>
            <li>
              <label htmlFor="username">Username: </label>
              <input name="username" type="text" ref={userNameRef} />
            </li>
            <li>
              <label htmlFor="password">Password: </label>
              <input name="password" type="password" ref={passwordRef} />
            </li>
            {isLoginFailed && <li className={classes.error}>Username or password incorrect.</li>}
          </ul>
        </form>
        <div className={classes.buttonsWrap}>
          <button
            id="back-btn"
            className={classes.button}
            onClick={clickHandler}
          >
            Back
          </button>
          <button
            id="login-btn"
            className={classes.button}
            onClick={clickHandler}
          >
            Login
          </button>
        </div>
      </NestedWindow>
    </>
  );
};

export default LoginWindow;
