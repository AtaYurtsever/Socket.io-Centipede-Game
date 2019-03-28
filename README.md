

# Centipede Game

# With Commitments

# User Manual



**Created by: Ata Yurtsever**

**Email: ata.yurtsever@ug.bilkent.edu.tr**

[**Github**](https://github.com/AtaYurtsever/Socket.io-Centipede-Game)























 This is a game of centipede with commitments. Game is created in javascript and uses mainly node.js and socket.io features. Game is played between two clients.

 Different kinds of games are stored in different branches in the github

- Master branch: is the game shown below
- Without commitments: is the game that does not involve commitments, it is the basic centipede game.
- Limited commitments: is the game that finishes the game when you achieve your commitment.

Below are the documentation for master branch(Centipede game with commitments). Gameplay and starting of the game is mostly same through the other types.

**Starting of a game**

1. To start the server install node.js
2. Than using the cmd go to the location of the project
3. type npm start
4. server should state that it is listening to port \*3000



1. first player creates a room by entering their name clicking create game button
2. User can see the penalty from this screen.

1. first player then has to commit a number which will represent the minimum number of turns he will play. In this screen he sees room id.



1. first player then sees the main gameplay page.



1. second player has to join game using his name and room id given by the first player.

1. second player then has to commit a number which will represent the minimum number of turns he will play.

1. second player then sees the main gameplay page.

**Gameplay for base version**

1. In the game of centipede each player takes turns deciding whether cooperating(continue) or defecting.
2. After each cooperation bets are swapped and doubled.
3. If a player defects, every player takes its current bet.
4. If a player defect before his committed turn he takes penalty.



**Gameplay without commitments**

1. In the game of centipede each player takes turns deciding whether cooperating(continue) or defecting.
2. After each cooperation bets are swapped and doubled.
3. If a player defects, every player takes its current bet.

**Gameplay with forced commitments**

1. In the game of centipede each player takes turns deciding whether cooperating(continue) or defecting.
2. After each cooperation bets are swapped and doubled.
3. If a player defects, every player takes its current bet.
4. When a player achieve his committed turn player automatically defects.

**Penalty Points**

**       ** Penalty points is used in  base version penalty points are visible in base version throughout the game and can be changed easily by changing the variable in the html file.

**Gathering Data**

1. After each game data of the game is stored as a csv. (results.csv)
2. Collected data are:
  1. player1
  2. player2
  3.  player1Commit
  4.  player2Commit
  5.  finishingPlayer
  6.  finishTurn
  7.  finishingBet
  8.  otherBet

**Gathering Extra Data**

**       ** You can collect more data as given in the example below

Suppose you want to collect age data

1. Add ageP1 and ageP2 to dataJson variable

1. create inbox boxes for age in the commit div
2. add variables to client side to store those variables
3. send those variables through the gameEnd function for player 1 and sendCred function for player 2.
4. tweak inside server side methods to store data.



**Playing the game on LAN**

1. To play the game on Lan use ipconfig on cmd to learn your ipv4 adress
2. change ip here with your ipv4 adress

1. other clients can join your server by using the link &#39;your-ip-adress&#39; + &#39;:3000&#39;

