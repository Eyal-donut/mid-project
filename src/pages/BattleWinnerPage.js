import { useLocationContext } from "../context/CurrentLocationContext";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import { useEnemiesContext } from "../context/EnemiesContext ";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import classes from "./BattlePage.module.css";

import BattleAnnouncer from "../Components/BattleAnnouncer";
import EnemyFighter from "../Components/EnemyFighter";
import Button from "../Components/Button";
import PokeballCatch from "../Components/PokeballCatch";
import { waitFunction } from "../hooks/useTypedMessage/waitFunction";

const BattleWinnerPage = () => {
  const { currentLocation } = useLocationContext();
  const { currentEnemy } = useEnemiesContext();
  const { currentPokemon } = useCurrentPokemonContext();
  const [enemyAnimation, setEnemyAnimation] = useState("enemyStatic");
  const [isCatchPokemon, setIsCatchPokemon] = useState(false);
  const [isEnemyDisplay, setIsEnemyDisplay] = useState(true);

  const navigate = useNavigate()

  const onCatchClick = () => {
    (async () => {
      setIsCatchPokemon(true);
      setEnemyAnimation("catchPokemon");
      await waitFunction(2000);
      setIsEnemyDisplay(false)
      await waitFunction(1000);
      navigate(`/map/${currentLocation.id}`)
      
    })();
  };

  return (
    <>
      <main
        className={classes.main}
        style={{
          background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
        }}
      >
        <h1>{currentPokemon.name} won!</h1>

        <BattleAnnouncer
          message={`Thats's your chance to catch ${currentEnemy.name}`}
        />
        {isEnemyDisplay && (
          <EnemyFighter
            className={classes[enemyAnimation]}
            imageUrl={currentEnemy.imageUrl}
            name={currentEnemy.name}
            value={0}
            maxValue={100}
            level={currentEnemy.level}
          />
        )}
        <footer className={classes.preFightFooter}>
          <div className={classes.btnWrapper}>
            <Button
              text="Catch Pokémon!"
              id="catch-pokemon"
              onBtnClick={onCatchClick}
              className={classes.utilInactive}
            ></Button>
            <Link to=".." relative="path">
              <Button
                text="Leave"
                id="leave-fight"
                className={classes.utilActive}
              ></Button>
            </Link>
          </div>
        </footer>
        {isCatchPokemon && <PokeballCatch />}
      </main>
    </>
  );
};

export default BattleWinnerPage;
