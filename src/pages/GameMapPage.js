import classes from "./GameMap.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setLocalStoragePokemonsData } from "../helpers/LocalStorageManagement";
import { locationsArray } from "../Data/LocationsData";
import Pokedex from "../Components/Pokedex";
import Announcer from "../Components/Announcer";
import { audio } from "../Audio/AudioData";
import SoundButton from "../Components/utils/SoundButton";
import useSound from "use-sound";

const GameMapPage = () => {

   const [playSound, { stop }] = useSound(audio.inGameSounds, {
     sprite: {
       gameMap: [158253, 232972],
     },
     volume: 0.5,
   });

   const soundHandler = () => {
     playSound({ id: "gameMap" });
     console.log("hi");
   };

  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(`/map/${e.target.id}`);
  };

  useEffect(() => {
    setLocalStoragePokemonsData();
  }, [setLocalStoragePokemonsData]);

  return (
    <>
      <SoundButton
        imageUrl="https://raw.githubusercontent.com/Eyal-donut/mid-project/main/src/assets/sound.png"
        onBtnClick={soundHandler}
      />
      <Pokedex />
      <main className={classes.main}>
        <div className={classes.cover}>
          <h1 className={classes.h1}>Game Map</h1>

          {locationsArray.map((location) => {
            return (
              <div
                key={location.id}
                className={`${classes.wrapper} ${location.className}`}
              >
                <h2 className={classes.h2}>{location.name}</h2>
                <div
                  id={location.id}
                  className={classes.location}
                  onClick={clickHandler}
                ></div>
              </div>
            );
          })}
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <Announcer
          className={classes.mapAnnouncer}
          message="Explore the Pokémon world and look for Pokémons to catch!"
        />
      </main>
    </>
  );
};
export default GameMapPage;
