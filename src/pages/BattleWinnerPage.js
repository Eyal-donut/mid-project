import { useLocationContext } from "../context/CurrentLocationContext";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import { useEnemiesContext } from "../context/EnemiesContext ";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import classes from "./BattlePage.module.css";

import Announcer from "../Components/Announcer";
import EnemyFighter from "../Components/EnemyFighter";
import Button from "../Components/utils/Button";
import Pokeball from "../Components/Pokeball";
import { waitFunction } from "../hooks/useTypedMessage/waitFunction";
import { useCatchPokemon } from "../hooks/useCatchPokemon";
import { usePokedexContext } from "../context/PokedexContext";

const BattleWinnerPage = () => {
  const { removePokemonFromEnemies, updateUserPokemons } =
    useCatchPokemon();

  const { currentLocation } = useLocationContext();
  const { currentEnemy } = useEnemiesContext();
  const { currentPokemon } = useCurrentPokemonContext();
  const {setPokedexUpdated} = usePokedexContext()
  const [enemyAnimation, setEnemyAnimation] = useState("enemyStatic");
  const [isCatchPokemon, setIsCatchPokemon] = useState(false);
  const [isEnemyDisplay, setIsEnemyDisplay] = useState(true);


  const navigate = useNavigate();

  const onCatchClick = () => {
    (async () => {
      updateUserPokemons();
      setPokedexUpdated(true)
      removePokemonFromEnemies();
      setIsCatchPokemon(true);
      await waitFunction(500);
      setEnemyAnimation("catchPokemon");
      await waitFunction(2000);
      setIsEnemyDisplay(false);
      await waitFunction(700);
      navigate(`/map/${currentLocation.id}`);
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

        <Announcer
          message={`${currentEnemy.name} has fainted, thats's your chance to catch him!`}
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
            <Button
              text="Catch Pokémon!"
              id="catch-pokemon"
              onBtnClick={onCatchClick}
              className={classes.utilBtn}
              disabled={isCatchPokemon ? true : false}
            ></Button>
            <Link to=".." relative="path">
              <Button
                text="Leave"
                id="leave-fight"
                className={classes.utilBtn}
                onBtnClick={()=>{}}
              ></Button>
            </Link>
        </footer>
        {isCatchPokemon && <Pokeball className={classes.pokeballCatch}/>}
      </main>
    </>
  );
};

export default BattleWinnerPage;
