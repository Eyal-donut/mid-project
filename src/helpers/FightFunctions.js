export const attack = ({ attacker, receiver }) => {
  
  const baseDamage = 17; // Base damage adjusted for high-level battles
  const levelDifference = (receiver.level - attacker.level) * 0.5; 
  const strengthFactor = attacker.strength * 0.2; // Strength influences damage slightly

  const receivedDamage = baseDamage + strengthFactor - levelDifference;
  const finalDamage = receivedDamage - receiver.defense * 0.1; // Defense reduces damage moderately

  return Math.max(finalDamage, 14); // Ensuring minimum 12 damage
};

export const specialAttack = ({ attacker, receiver }) => {
  
  const baseDamage = 18; // Slightly stronger than normal attack
  
  const levelDifference = (receiver.level - attacker.level) * 0.5;
  const strengthFactor = attacker.strength * 0.25; // Strength influences more
  
  const receivedDamage = baseDamage + strengthFactor - levelDifference;
  const finalDamage = receivedDamage - receiver.defense * 0.1;
  
 
  return Math.max(finalDamage, 16); // Ensuring minimum 15 damage for special attacks
};

export const heal = ({ receiver }) => {
  return receiver.level * 0.6; // Healing scales but is not overpowered
};
