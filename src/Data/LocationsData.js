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
      imageUrl: imageUrlOne
    },
    {
      name: "Under the mountain",
      id: "location-two",
      className: `${classes.two}`,
      imageUrl: imageUrlTwo
    },
    {
      name: "Pokéforest",
      id: "location-three",
      className: `${classes.three}`,
      imageUrl: imageUrlThree
    },
    {
      name: "Beach",
      id: "location-four",
      className: `${classes.four}`,
      imageUrl: imageUrlFour
    },
  ];