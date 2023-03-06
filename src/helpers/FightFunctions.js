export const attack = ({ attacker, receiver }) => {
    const receivedDamage =
      attacker.strength - (attacker.level - receiver.level) * 1.25;
  
    const finalDamage = receivedDamage - receiver.defense / 2;
  
    return finalDamage;
  };
  export const specialAttack = ({ attacker, receiver }) => {
    const receivedDamage =
      attacker.strength - (attacker.level - receiver.level) * 1.55;
  
    const finalDamage = receivedDamage - receiver.defense / 2;
  
    return finalDamage;
  };
  export const heal = ({ receiver }) => {
    return receiver.level * 0.25;
  };
  