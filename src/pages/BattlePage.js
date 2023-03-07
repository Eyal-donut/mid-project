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
import UserPokemonsCarousel from "../Components/UserPokemonsCarousell";


const BattlePage = () => {
  const { currentLocation } = useLocationContext();
  const { currentEnemy } = useEnemiesContext();
  const { currentPokemon } = useCurrentPokemonContext();
  const { isBattleStarted, setIsBattleStarted } = useBattleContext();

  const [sequence, setSequence] = useState({});
  const [winner, setWinner] = useState();
  const [isGameOver, setGameOver] = useState(false);
  const [isPlayerWinner, setIsPlayerWinner] = useState(false);
  const [isChoosePokemon, setIsChoosePokemon] = useState(false);

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

  useEffect(() => {
    localStorage.setItem("currentEnemy", JSON.stringify(currentEnemy));
  }, [currentEnemy]);

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

  useEffect(() => {
    setIsBattleStarted(false);
  }, [setIsBattleStarted]);

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
            {isChoosePokemon && <UserPokemonsCarousel/>}

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
                <Button
                  text="Catch Pokémon!"
                  id="cath-pokemon"
                  onBtnClick={() => {}}
                  className={classes.utilInactive}
                ></Button>
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
