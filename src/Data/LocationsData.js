import classes from '../pages/GameMap.module.css'
import imageUrlOne from '../assets/backgrounds/mountain2.jpg'
import imageUrlThree from '../assets/backgrounds/forest.jpg'
import imageUrlTwo from '../assets/backgrounds/lava.jpg'
import imageUrlFour from '../assets/backgrounds/beach.jpg'

export const locationsArray = [
    {
      name: "The north",
      id: "location-one",
      className: `${classes.one}`,
      imageUrl: imageUrlOne,
      description: 'This area known to have many rock type Pokémons. Explore your surroundigs and try to catch them!'
    },
    {
      name: "Under the mountain",
      id: "location-two",
      className: `${classes.two}`,
      imageUrl: imageUrlTwo,
      description: 'This area known to have many fire type Pokémons. Explore your surroundigs and try to catch them!'
    },
    {
      name: "Pokéforest",
      id: "location-three",
      className: `${classes.three}`,
      imageUrl: imageUrlThree,
      description: 'This area known to have many grass and insect type Pokémons. Explore your surroundigs and try to catch them!'
    },
    {
      name: "Beach",
      id: "location-four",
      className: `${classes.four}`,
      imageUrl: imageUrlFour,
      description: 'This area known to have many water type Pokémons. Explore your surroundigs and try to catch them!'
    },
  ];