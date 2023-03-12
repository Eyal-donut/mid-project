import { useLocationContext } from "../context/CurrentLocationContext";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import { useEnemiesContext } from "../context/EnemiesContext ";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import classes from "./BattlePage.module.css";

import Announcer from "../Components/Announcer";
import PlayerFighter from "../Components/PlayerFighter";

import { waitFunction } from "../hooks/useTypedMessage/waitFunction";

const BattleLooserPage = () => {
  const { currentLocation } = useLocationContext();
  const { currentEnemy } = useEnemiesContext();
  const { currentPokemon } = useCurrentPokemonContext();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await waitFunction(2000);
      navigate(`/map/${currentLocation.id}`);
    })();
  },[navigate, currentLocation.id]);

  return (
    <>
      <main
        className={classes.main}
        style={{
          background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
        }}
      >
        <h1>{currentEnemy.name} won!</h1>

        <Announcer message={`${currentEnemy.name} has escaped!`} />
        <PlayerFighter
          className={classes.playerStatic}
          imageUrl={currentPokemon.imageUrl}
          name={currentPokemon.name}
          value={0}
          maxValue={100}
          level={currentPokemon.level}
        />
        {/* <footer className={classes.preFightFooter}>
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
                    onBtnClick={()=>{}}
                  ></Button>
                </Link>
              </div>
            </footer>
            {isCatchPokemon && <Pokeball className={classes.pokeballCatch}/>} */}
      </main>
    </>
  );
};
export default BattleLooserPage;
