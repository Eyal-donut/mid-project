import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import classes from "./BattlePage.module.css";
import Pokedex from "../Components/Pokedex";
import { useLocationContext } from "../context/CurrentLocationContext";
import { useEnemiesContext } from "../context/EnemiesContext ";
import PlayerFighter from "../Components/PlayerFighter";
import EnemyFighter from "../Components/EnemyFighter";
import Button from "../Components/Button";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import BattleAnnouncer from "../Components/BattleAnnouncer";
import { useBattleSequence } from "../hooks/useBattleSequence";
import { useAIOpponent } from "../hooks/useAIOpponent";
import { waitFunction } from "../hooks/useTypedMessage/waitFunction";
import BattleWinnerPage from "./BattleWinnerPage";
import { useBattleContext } from "../context/BattleContext";
import UserPokemonsCarouselBattle from "../Components/UserPokemonsCarousellBattle";
import { useLoggedUsersContext } from "../context/LoggedUserContext";

const BattlePage = () => {
  const { currentLocation, setCurrentLocation } = useLocationContext();
  const { currentEnemy, setCurrentEnemy } = useEnemiesContext();
  const { currentPokemon, setCurrentPokemon, isChoosePokemon, setIsChoosePokemon } =
    useCurrentPokemonContext();
  const { isBattleStarted, setIsBattleStarted } = useBattleContext();
  const {setLoggedUser} = useLoggedUsersContext()

  const [sequence, setSequence] = useState({});
  const [winner, setWinner] = useState();
  const [isGameOver, setGameOver] = useState(false);
  const [isPlayerWinner, setIsPlayerWinner] = useState(false);

  const onBattleClick = () => {
    setIsBattleStarted(true);
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


  useEffect(()=> {
    setCurrentLocation(JSON.parse(localStorage.getItem("currentLocation")))
    setCurrentPokemon(JSON.parse(localStorage.getItem("currentPokemon")))
    setCurrentEnemy(JSON.parse(localStorage.getItem("currentEnemy")))
    setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")))
    setIsBattleStarted(false);
    setIsChoosePokemon(false);

  },[setCurrentLocation, setCurrentPokemon, setCurrentEnemy, setIsBattleStarted, setIsChoosePokemon])

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

  useEffect(() => {
    if (winner === currentPokemon) {
      setIsPlayerWinner(true);
    }
  }, [winner, setIsPlayerWinner]);


  if (!isPlayerWinner && !isGameOver) {
    return (
      <>
        {!isBattleStarted && (
          <main
            className={classes.main}
            style={{
              background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
            }}
          >
            {isChoosePokemon && <UserPokemonsCarouselBattle />}
            <Pokedex />
            <h1>{currentEnemy.name} has appeared!</h1>

            <BattleAnnouncer message={`Check out your Pokédex for details!`} />
            <EnemyFighter
              imageUrl={currentEnemy.imageUrl}
              name={currentEnemy.name}
              value={enemyHealth}
              maxValue={currentEnemy.maxHealth}
              level={currentEnemy.level}
            />
            <footer className={classes.preFightFooter}>
              {/* <div className={classes.btnWrapper}> */}
              <Button
                text="Battle!"
                id="battle"
                onBtnClick={onBattleClick}
                className={classes.attackInactive}
              ></Button>
              <Button
                text="Choose your Pokémon!"
                id="choose-pokemon"
                onBtnClick={choosePokemonClick}
                className={classes.attackInactive}
              ></Button>
              <Link to=".." relative="path">
                <Button
                  text="Leave"
                  id="leave-fight"
                  className={classes.attackInactive}
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

            <BattleAnnouncer
              message={
                announcerMessage || `What should ${currentPokemon.name} do?`
              }
            />
            <PlayerFighter
              className={classes[playerAnimation]}
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
                text={`Use ${currentPokemon.attacks.attack1}`}
                id="attack-one"
                onBtnClick={() => setSequence({ turn, mode: "attack" })}
                className={classes.attackActive}
              />
              <Button
                text={`Use Special Move - ${currentPokemon.attacks.attack2}`}
                id="special-attack"
                onBtnClick={() => setSequence({ turn, mode: "specialAttack" })}
                className={classes.attackActive}
              />
              <Button
                text="Heal"
                id="heal"
                onBtnClick={() => setSequence({ turn, mode: "heal" })}
                className={classes.attackActive}
              />
              <div className={classes.btnWrapper}>
                <Link to=".." relative="path">
                  <Button
                    text="Leave fight"
                    id="leave-fight"
                    className={classes.utilActive}
                  ></Button>
                </Link>
              </div>
            </footer>
          </main>
        )}
      </>
    );
  }
  if (isGameOver && isPlayerWinner) {
    return <BattleWinnerPage />;
  }
};

export default BattlePage;
