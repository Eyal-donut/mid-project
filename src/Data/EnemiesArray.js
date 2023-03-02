import classes from "../pages/LocationPage.module.css";
import zero from '../assets/enemies/0.png'
import one from '../assets/enemies/1.png'
import two from '../assets/enemies/2.png'
import three from '../assets/enemies/3.png'
import four from '../assets/enemies/4.png'
import five from '../assets/enemies/5.png'
import six from '../assets/enemies/6.png'
import seven from '../assets/enemies/7.png'
import eight from '../assets/enemies/8.png'
import nine from '../assets/enemies/9.png'
import ten from '../assets/enemies/10.png'
import eleven from '../assets/enemies/11.png'
import twelve from '../assets/enemies/12.png'
import thirteen from '../assets/enemies/13.png'
import fourteen from '../assets/enemies/14.png'
import fifteen from '../assets/enemies/15.png'
import sixteen from '../assets/enemies/16.png'
import seventeen from '../assets/enemies/17.png'
import eighteen from '../assets/enemies/18.png'
import nineteen from '../assets/enemies/19.png'


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
  
  export const testEnemy = {
    id: 0,
    number: 'one',
    strength: 3,
    defense: 3,
    skillPoints: 3,
    attacks: ['speed', 'fireball'],
    healthPoints: 100,
    xpReward: 5,
    location: 'location-one',
    imageUrl: zero,
    className: `${classes.one}`,
  }