# Pokémon Readme File

Welcome to my Pokémon game! 
This is a fun, React based RPG (role-playing game), inspired from the iconic TV series from the 90's, that millions around the world grew up with. This game allows you to tour through the Pokémon world, explore a variety of maps and fight many different Pokémons. And of course, to try and catch 'em all! 

The game allows users to play with the Pokémons they catch, and fight dynamically generated opponents that are adapted to the users' level. To add a bit of a challenge, the game's difficulty increases as the game progresses.
The game is powered by React and Firebase Realtime Database, and is integrated with several features that make the user experience fun and smooth.


## How to Run the Game

Simply visit the following link from a computer or any mobile device:

https://pokemon-rpg.netlify.app


## How to play

The game incorporates an easy to follow user experience, which simply explains what to do in every step of the way, and is inspired by the original TV series and the Gameboy Pokémon games from the 90's. 

In short the game flow takes the users through these steps:

1. Open the app on your device.
2. Choose a map in the Pokémon world that you would like to explore.
3. Choose an area in this map. In each area there are Pokémons to battle.
4. Choose a Pokémon that you would like to fight with. 
5. Battle and try to catch 'em all!
6. Your Pokémons are always shown in your Pokédex - a "device" that is updated with every Pokémon you catch, easily accessible from the corner of the screen.

## Features

The game comes with the following features:

- An interactive Pokémon world, consisting of several maps and many different opponents to fight.
- Dynamically updated maps - after a user caught a Pokémon, it will not appear again.
- Create a user to automatically save your progress.
- Dynamically generated opponents - adjusted to the users' level.
- Pokédex showing the users' Pokémons, which is synced with the users' data on Firebase Realtime Database.
- Play with the Pokémons you catch. The user is being updated in the Database and in the front-end as the game progresses, with zero loading time.
- Responsive UI, adapted to use from any device.
- Announcer - a messages typing component that accompanies the user throughout the game, for a seamless user experience and a retro 90's design. 
## Technologies Used

The game was developed using the following technologies:

- React
- Firebase Realtime Database

## Deployment Services Used

- Netlify

## Planned Features

We are continually improving the app and have several planned features in the pipeline. The following features are planned for:

- Connect the game to PokéAPI, in order to randomly generate opponents from hundreds of Pokémons, so users can always fight different opponents (currently there are 27 different Pokémons in the game).
- Create a MongoDB database to support the game backend.
- User authentication with JWT.
- Adding sound to the game.

## Challenges

The development of the game presented several challenges, including:

- Dynamically creating opponents that are adapted to the users' level.
- The battle logic: The battle is the core of the rpg game, and it was important for me that it will have a seamless flow and readable code. For this I developed a custom hook, which controls who's turn it is, the health of the players and the animations that accompany each stage of the battle sequence.  

### Thank you for checking out my Pokémon game, have fun playing!
