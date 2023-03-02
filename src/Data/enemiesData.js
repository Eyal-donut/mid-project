import classes from "../pages/LocationPage.module.css";
import zero from "../assets/enemies/0.png";
import one from "../assets/enemies/1.png";
import two from "../assets/enemies/2.png";
import three from "../assets/enemies/3.png";
import four from "../assets/enemies/4.png";
import five from "../assets/enemies/5.png";
import six from "../assets/enemies/6.png";
import seven from "../assets/enemies/7.png";
import eight from "../assets/enemies/8.png";
import nine from "../assets/enemies/9.png";
import ten from "../assets/enemies/10.png";
import eleven from "../assets/enemies/11.png";
import twelve from "../assets/enemies/12.png";
import thirteen from "../assets/enemies/13.png";
import fourteen from "../assets/enemies/14.png";
import fifteen from "../assets/enemies/15.png";
import sixteen from "../assets/enemies/16.png";
import seventeen from "../assets/enemies/17.png";
import eighteen from "../assets/enemies/18.png";
import nineteen from "../assets/enemies/19.png";
import twenty from "../assets/enemies/20.png";
import twentyOne from "../assets/enemies/21.png";
import twentyTwo from "../assets/enemies/22.png";
import twentyThree from "../assets/enemies/23.png";

export const enemiesData = [
  { name: "Onix", id: 0, imageUrl: zero },
  { name: "Machoke", id: 1, imageUrl: one },
  { name: "Meowth", id: 2, imageUrl: two },
  { name: "Psyduck", id: 3, imageUrl: three },
  { name: "Mankey", id: 4, imageUrl: four },
  { name: "Beedrill", id: 5, imageUrl: five },

  { name: "Charizard", id: 6, imageUrl: six },
  { name: "Rapidash", id: 7, imageUrl: seven },
  { name: "Ninetales", id: 8, imageUrl: eight },
  { name: "Charmander", id: 9, imageUrl: nine },
  { name: "Arcanine", id: 10, imageUrl: ten },
  { name: "Magmar", id: 11, imageUrl: eleven },

  { name: "Gyarados", id: 12, imageUrl: twelve },
  { name: "Poliwhirl", id: 13, imageUrl: thirteen },
  { name: "Tentacruel", id: 14, imageUrl: fourteen },
  { name: "Vaporeon", id: 15, imageUrl: fifteen },
  { name: "Lapras", id: 16, imageUrl: sixteen },
  { name: "Dragonair", id: 17, imageUrl: seventeen },

  { name: "Mewtwo", id: 18, imageUrl: eighteen },
  { name: "Raichu", id: 19, imageUrl: nineteen },
  { name: "Alakazam", id: 20, imageUrl: twenty },
  { name: "Arbok", id: 21, imageUrl: twentyOne },
  { name: "Jigglypuff", id: 22, imageUrl: twentyTwo },
  { name: "Weepinbell", id: 23, imageUrl: twentyThree },
];

export const testEnemy = {
  id: 0,
  number: "one",
  className: `${classes.one}`,
  name: "Onix",
  strength: 3,
  defense: 3,
  skillPoints: 3,
  attacks: ["speed", "fireball"],
  healthPoints: 100,
  xpReward: 5,
  location: "location-one",
  imageUrl: zero,
};
