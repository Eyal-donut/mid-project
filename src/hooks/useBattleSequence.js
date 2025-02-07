import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import { useEnemiesContext } from "../context/EnemiesContext ";
import { attack, specialAttack, heal } from "../helpers/FightFunctions";

import { useState, useEffect } from "react";
import { waitFunction } from "./useTypedMessage/waitFunction";

export const useBattleSequence = (sequence) => {
  const { currentEnemy } = useEnemiesContext();
  const { currentPokemon } = useCurrentPokemonContext();

  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [enemyHealth, setEnemyHealth] = useState(currentEnemy.maxHealth);
  const [playerHealth, setPlayerHealth] = useState(currentPokemon.maxHealth);
  const [announcerMessage, setAnnouncerMessage] = useState("");

  const [playerAnimation, setPlayerAnimation] = useState("playerStatic");
  const [enemyAnimation, setEnemyAnimation] = useState("enemyStatic");

  useEffect(() => {
    const { mode, turn } = sequence;

    if (mode && !inSequence) {
      const attacker = turn === 0 ? currentPokemon : currentEnemy;
      const receiver = turn === 0 ? currentEnemy : currentPokemon;

      switch (mode) {
        case "attack":
          {
            const damage = attack({ attacker, receiver });

            (async () => {
              setInSequence(true);
              setAnnouncerMessage(
                `${attacker.name} is attacking with ${attacker.attacks?.attackOne}!`
              );

              await waitFunction(1000);

              turn === 0
                ? setPlayerAnimation("playerAttack")
                : setEnemyAnimation("enemyAttack");
              await waitFunction(100);

              turn === 0
                ? setPlayerAnimation("playerStatic")
                : setEnemyAnimation("enemyStatic");
              await waitFunction(500);

              turn === 0
                ? setEnemyAnimation("enemyDamage")
                : setPlayerAnimation("playerDamage");
              await waitFunction(750);

              turn === 0
                ? setEnemyAnimation("enemyStatic")
                : setPlayerAnimation("playerStatic");

              setAnnouncerMessage(`${receiver.name} felt that!`);

              turn === 0
                ? setEnemyHealth((hp) => (hp - damage > 0 ? hp - damage : 0))
                : setPlayerHealth((hp) => (hp - damage > 0 ? hp - damage : 0));

              await waitFunction(2000);

              setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);

              await waitFunction(1500);

              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            })();
          }

          break;

        case "specialAttack":
          {
            const damage = specialAttack({ attacker, receiver });

            (async () => {
              setInSequence(true);
              setAnnouncerMessage(
                `${attacker.name} is attacking with ${attacker.attacks?.attackTwo}! Powerful move!`
              );

              await waitFunction(1000);

              turn === 0
                ? setPlayerAnimation("playerSpecialAttack")
                : setEnemyAnimation("enemySpecialAttack");
              await waitFunction(100);

              turn === 0
                ? setPlayerAnimation("playerStatic")
                : setEnemyAnimation("enemyStatic");
              await waitFunction(500);

              turn === 0
                ? setEnemyAnimation("enemyDamage")
                : setPlayerAnimation("playerDamage");
              await waitFunction(750);

              turn === 0
                ? setEnemyAnimation("enemyStatic")
                : setPlayerAnimation("playerStatic");

              setAnnouncerMessage(
                `${receiver.name} doesn't know what hit him!`
              );

              turn === 0
                ? setEnemyHealth((hp) => (hp - damage > 0 ? hp - damage : 0))
                : setPlayerHealth((hp) => (hp - damage > 0 ? hp - damage : 0));

              await waitFunction(2000);

              setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);

              await waitFunction(1500);

              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            })();
          }
          break;

        case "heal":
          {
            const recovered = heal({ receiver: attacker });
            (async () => {
              setInSequence(true);
              setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
              await waitFunction(1000);

              turn === 0
                ? setPlayerAnimation("playerSpecialAttack")
                : setEnemyAnimation("enemySpecialAttack");
              await waitFunction(1000);

              turn === 0
                ? setPlayerAnimation("playerStatic")
                : setEnemyAnimation("enemyStatic");
              await waitFunction(500);

              setAnnouncerMessage(`${attacker.name} has recovered health.`);

              turn === 0
                ? setPlayerHealth((hp) =>
                    hp + recovered <= attacker.maxHealth
                      ? hp + recovered
                      : attacker.maxHealth
                  )
                : setEnemyHealth((hp) =>
                    hp + recovered <= attacker.maxHealth
                      ? hp + recovered
                      : attacker.maxHealth
                  );

              await waitFunction(2500);
              setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);

              await waitFunction(1500);

              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            })();
          }
          break;

        default: {
          break;
        }
      }
    }
    // eslint-disable-next-line
  }, [sequence]);

  return {
    turn,
    inSequence,
    playerHealth,
    enemyHealth,
    announcerMessage,
    playerAnimation,
    enemyAnimation,
  };
};
