const EnemiesArray = [
    "Onix",
    "Machoke",
    "Meowth",
    "Psyduck",
    "Mankey",
    "Beedrill",
  
    "Charizard",
    "Rapidash",
    "Ninetales",
    "Charmander",
    "Arcanine",
    "Magmar",
  
    "Gyarados",
    "Poliwhirl",
    "Tentacruel",
    "Vaporeon",
    "Lapras",
    "Dragonair",
  
    "Mewtwo",
    "Raichu",
    "Alakazam",
    "Arbok",
    "Jigglypuff",
    "Weepinbell",
  ];
  
  export default class Enemy {
    constructor(
      number,
      name,
      strength,
      defense,
      level,
      healthPoints,
      xpReward,
      dexterity,
      gold,
      src,
      location,
    ) {
      this.number = number;
      this.name = name;
      this.strength = strength;
      this.defense = defense;
      this.level = level;
      this.dexterity = dexterity;
      this.healthPoints = healthPoints;
      this.xpReward = xpReward;
      this.gold = gold;
      this.src = src
      this.location = location;
    }
    monsterRollDice() {//rolls dice to determine who starts first
      return Math.floor(Math.random() * 20) + 1
    }
    attack() {//attack method returns an integer of damage to deal to monster
      let roll = Math.floor(Math.random() * 20) + 1
      return (roll + this.strength) * this.level
    }
    static defineLocation(monster, i) {
      if (i >= 0 && i <= 5) {
        monster.location = "location-one";
      }
      else if (i >= 6 && i <= 11) {
        monster.location = "location-two";
      }
      else if (i >= 12 && i <= 17) {
        monster.location = "location-four";
      }
      else if (i >= 18 && i <= 23) {
        monster.location = "location-three";
      }
    }
  
    static randomIntFromInterval(min, max) {
      // min and max included
      let randomItn = Math.floor(Math.random() * (max - min + 1) + min);
      if (randomItn <= 0) {
        randomItn = 1}
      return randomItn
    }
  
    static generateMonsterArray(locationInput, player) {
      const generatedEnemies = [];
      for (let i = 0; i < EnemiesArray.length; ++i) {
        const newEnemy = new Enemy(
          i,
          EnemiesArray[i],
          this.randomIntFromInterval(player.strength - 2, player.strength + 2),
          this.randomIntFromInterval(player.defense - 2, player.defense + 2),
          this.randomIntFromInterval(player.level - 2, player.level + 2),
          100,
          this.randomIntFromInterval(1, 5),
          this.randomIntFromInterval(player.dexterity - 2, player.dexterity + 2),
          this.randomIntFromInterval(1, 5),
          this.src = `../assets/enemies/${i}.png`
        );
        this.defineLocation(newEnemy, i)
  
        if (newEnemy.location === locationInput) {
          generatedEnemies.push(newEnemy);
        }
      }
    //   localStorage.setItem('enemies', JSON.stringify(generatedEnemies))
    //   return generatedEnemies;
    }
  }
  // console.log(Monster.generateMonsterArray("canalaveGymName", player1));
  
  