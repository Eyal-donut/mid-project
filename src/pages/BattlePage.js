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

const BattlePage = () => {
  const { currentLocation } = useLocationContext();
  const { currentEnemy } = useEnemiesContext();
  const { currentPokemon } = useCurrentPokemonContext();

  const [sequence, setSequence] = useState({});

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
    localStorage.setItem(
      "localStorageCurrentEnemy",
      JSON.stringify(currentEnemy)
    );
  }, [currentEnemy]);


  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  const [isBattleActive, setBattleActive] = useState(true);

  const clickHandler = (btnId) => {};

  return (
    <>
      {!isBattleActive && <Pokedex />}
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
          message={announcerMessage || `What should ${currentPokemon.name} do?`}
        />
        <PlayerFighter
          className={classes[playerAnimation]}
          imageUrl={currentPokemon.imageUrl}
          name={currentPokemon.name}
          value={playerHealth}
          maxValue={currentPokemon.maxHealth}
        />
        <EnemyFighter
          className={classes[enemyAnimation]}
          imageUrl={currentEnemy.imageUrl}
          name={currentEnemy.name}
          value={enemyHealth}
          maxValue={currentEnemy.maxHealth}
        />

        {isBattleActive && (
          <footer className={classes.footer}>
            <Button
              text={`Use ${currentPokemon.attacks.attack1}`}
              id="attack-one"
              onBtnClick={() => setSequence({ turn, mode: "attack" })}
              className={classes.attackActive}
            />
            <Button
              text={`Use Special Move - ${currentPokemon.attacks.attack2}`}
              id="attack-two"
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
                  onBtnClick={clickHandler}
                  className={classes.utilActive}
                ></Button>
              </Link>
              <Button
                text="Catch Pokémon!"
                id="cath-pokemon"
                onBtnClick={clickHandler}
                className={classes.utilInactive}
              ></Button>
            </div>
          </footer>
        )}
      </main>
    </>
  );
};

export default BattlePage;
