import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import classes from "./BattlePage.module.css";
import Pokedex from "../Components/Pokedex";
import { useLocationContext } from "../context/CurrentLocationContext";
import { useEnemiesContext } from "../context/EnemiesContext ";
import PlayerFighter from "../Components/PlayerFighter";
import EnemyFighter from "../Components/EnemyFighter";
import Button from "../Components/utils/Button";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import Announcer from "../Components/Announcer";
import { useBattleSequence } from "../hooks/useBattleSequence";
import { useAIOpponent } from "../hooks/useAIOpponent";
import { waitFunction } from "../hooks/useTypedMessage/waitFunction";
import BattleWinnerPage from "./BattleWinnerPage";
import { useBattleContext } from "../context/BattleContext";
import UserPokemonsCarouselBattle from "../Components/UserPokemonsCarousellBattle";
import { useLoggedUsersContext } from "../context/LoggedUserContext";
import Pokeball from "../Components/Pokeball";
import BattleLooserPage from "./BattleLooserPage";

const BattlePage = () => {

  const { currentLocation, setCurrentLocation } = useLocationContext();
  const { currentEnemy, setCurrentEnemy } = useEnemiesContext();
  const {
    currentPokemon,
    setCurrentPokemon,
    isChoosePokemon,
    setIsChoosePokemon,
  } = useCurrentPokemonContext();
  const { isBattleStarted, setIsBattleStarted } = useBattleContext();
  const { setLoggedUser } = useLoggedUsersContext();

  const [isLaunchPokemon, setIsLaunchPokemon] = useState(false);
  const [sequence, setSequence] = useState({});
  const [winner, setWinner] = useState();
  const [isGameOver, setGameOver] = useState(false);

  const onBattleClick = () => {
    (async () => {
      setIsBattleStarted(true);
      setIsLaunchPokemon(true);
      await waitFunction(1500);
      setIsLaunchPokemon(false);
    })();
  };

  const choosePokemonClick = () => {
    setIsChoosePokemon(true);
  };

  const onGameEnd = (winner) => {
    setWinner(winner);
    setGameOver(true);
  };

  const {
    turn,
    inSequence,
    playerHealth,
    enemyHealth,
    announcerMessage,
    playerAnimation,
    enemyAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    setCurrentLocation(JSON.parse(localStorage.getItem("currentLocation")));
    setCurrentPokemon(JSON.parse(localStorage.getItem("currentPokemon")));
    setCurrentEnemy(JSON.parse(localStorage.getItem("currentEnemy")));
    setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")));
    setIsBattleStarted(false);
    setIsChoosePokemon(false);

    return () => {
      setWinner()
      setGameOver(false)
    };

  }, [
    setCurrentLocation,
    setCurrentPokemon,
    setCurrentEnemy,
    setIsBattleStarted,
    setIsChoosePokemon,
    setWinner,
    setGameOver,
  ]);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    if (playerHealth === 0 || enemyHealth === 0) {
      (async () => {
        await waitFunction(1000);
        onGameEnd(playerHealth === 0 ? currentEnemy : currentPokemon);
      })();
    }
  }, [playerHealth, enemyHealth, onGameEnd]);


  if (!isGameOver) {
    return (
      <>
        {!isBattleStarted && (
          <main
            className={classes.main}
            style={{
              background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
            }}
          >
            {isChoosePokemon && (
              <UserPokemonsCarouselBattle onBtnClick={onBattleClick} />
            )}
            <Pokedex />
            <h1>{currentEnemy.name} has appeared!</h1>

            <Announcer message={`Choose a Pokémon and fight!`} />
            <EnemyFighter
              imageUrl={currentEnemy.imageUrl}
              name={currentEnemy.name}
              value={enemyHealth}
              maxValue={currentEnemy.maxHealth}
              level={currentEnemy.level}
            />
            <footer className={classes.preFightFooter}>
              <Button
                text="Choose Pokémon"
                id="choose-pokemon"
                onBtnClick={choosePokemonClick}
                className={classes.utilBtn}
              ></Button>
              <Link to=".." relative="path">
                <Button
                  text="Leave"
                  id="leave-fight"
                  className={classes.utilBtn}
                  onBtnClick={()=>{}}
                ></Button>
              </Link>
              {/* </div> */}
            </footer>
          </main>
        )}

        {isBattleStarted && (
          <main
            className={classes.main}
            style={{
              background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
            }}
          >
            <h1>
              {currentPokemon.name} VS {currentEnemy.name}
            </h1>
            {isLaunchPokemon && (
              <Pokeball className={classes.pokeballStartFight} />
            )}
            <Announcer
              message={
                announcerMessage || `What should ${currentPokemon.name} do?`
              }
            />
            <PlayerFighter
              className={isLaunchPokemon ? classes.hide : classes[playerAnimation]}
              imageUrl={currentPokemon.imageUrl}
              name={currentPokemon.name}
              value={playerHealth}
              maxValue={currentPokemon.maxHealth}
              level={currentPokemon.level}
            />
            <EnemyFighter
              className={classes[enemyAnimation]}
              imageUrl={currentEnemy.imageUrl}
              name={currentEnemy.name}
              value={enemyHealth}
              maxValue={currentEnemy.maxHealth}
              level={currentEnemy.level}
            />

            <footer className={classes.footer}>
              <Button
                text={`Use ${currentPokemon.attacks?.attackOne}`}
                id="attack-one"
                onBtnClick={() => setSequence({ turn, mode: "attack" })}
                className={classes.battleBtn}
                disabled={inSequence ? true : false}
              />
              <Button
                text={`Use Special Move - ${currentPokemon.attacks?.attackTwo}`}
                id="special-attack"
                onBtnClick={() => setSequence({ turn, mode: "specialAttack" })}
                className={classes.battleBtn}
                disabled={inSequence ? true : false}

              />
              <Button
                text="Heal"
                id="heal"
                onBtnClick={() => setSequence({ turn, mode: "heal" })}
                className={classes.battleBtn}
                disabled={inSequence ? true : false}

              />
              <div className={classes.btnWrapper}>
                <Link to=".." relative="path">
                  <Button
                    text="Leave fight"
                    id="leave-fight"
                    className={classes.utilBtn}
                    onBtnClick={()=>{}}
                  ></Button>
                </Link>
              </div>
            </footer>
          </main>
        )}
      </>
    );
  }
  if (isGameOver && winner === currentPokemon) {
    return <BattleWinnerPage />;
  }
  if (isGameOver && winner === currentEnemy) {
    return <BattleLooserPage/>;
  }
};

export default BattlePage;
