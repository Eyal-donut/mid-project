import { Link } from "react-router-dom";
import React, {useState } from "react";
import classes from "./BattlePage.module.css";
import Pokedex from "../Components/Pokedex";
import { useLocationContext } from "../context/CurrentLocationContext";
import { useEnemiesContext } from "../context/EnemiesContext";
import PlayerFighter from "../Components/PlayerFighter";
import EnemyFighter from "../Components/EnemyFighter";
import Button from "../Components/Button";
import { testUser } from "../Data/UserData";

const BattlePage = () => {
  const { currentLocation } = useLocationContext();
  const { currentEnemy } = useEnemiesContext();
  const [currentPokemon, setCurrentPokemon] = useState(testUser.pokemons[0]);
  const [isBattleActive, setBattleActive] = useState(true);

  //battle managment states
  const [isPlayerAttacking, setPlayerAttacking] = useState(true);
  const [isDodge, setIsDodge] = useState(false);
  const [isBattleWon, setBattleWon] = useState(false);

  // useEffect(() => {
  //pokedex opens, user checks out enemy, chooses if to fight or flight, chooses active pokemon
  // Ill set the state here just to work on the battle sequence.
  //   setCurrentPokemon(activeUser.pokemons[0]);
  // }, []);
  //! When I use use effect here the site crashes...

  const clickHandler = (btnId) => {
  };

  return (
    <>
      {!isBattleActive && <Pokedex />}
      <main
        className={classes.main}
        style={{
          background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
        }}
      >
        <h1>let's fucking go!</h1>
        <PlayerFighter imageUrl={currentPokemon.imageUrl} />
        <EnemyFighter imageUrl={currentEnemy.imageUrl} />

        {isBattleActive && (
          <footer className={classes.footer}>
            <Button
              text={`Use ${currentPokemon.attacks[0]}`}
              id="attack-one"
              onBtnClick={clickHandler}
              className={
                isPlayerAttacking
                  ? classes.attackActive
                  : classes.attackInactive
              }
            />
            <Button
              text={`Use ${currentPokemon.attacks[1]}`}
              id="attack-two"
              onBtnClick={clickHandler}
              className={
                isPlayerAttacking
                  ? classes.attackActive
                  : classes.attackInactive
              }
            />
            <Button
              text="Dodge"
              id="dodge"
              onBtnClick={clickHandler}
              className={
                !isPlayerAttacking
                  ? classes.attackActive
                  : classes.attackInactive
              }
            />
            <div className={classes.btnWrapper}>
            <Link to='..' relative="path">
              <Button
                text="Leave fight"
                id="leave-fight"
                onBtnClick={clickHandler}
                className={classes.utilActive}
              ></Button>
            </Link>
              <Button
                text="Catch Pokémon!"
                id="cath-pokemon"
                onBtnClick={clickHandler}
                className={
                  isBattleWon ? classes.utilActive : classes.utilInactive
                }
              ></Button>
            </div>
          </footer>
        )}
      </main>
    </>
  );
};

export default BattlePage;
