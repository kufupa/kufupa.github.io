Pacman++

My "improvement" upon Pacman

THIS IS SUPER UNFINISHED BCit was an assignment for my school grade, it was about 35k words and on Pacman, it was heavily document focused so i'm not proud of the actual code, 

Please feel free to help me out, and I'll detail some features that are bad / not implemented

Any questions just submit an issue / hmu on discord - SpooderMan#8192
My comments in the code should explain how everything works but again hmu if u need to know something specific

STUFF TODO:

- Ghost pathfinding (change the target location) # https://www.youtube.com/watch?v=ataGotQ7ir8

- High score at end of game (check and take user input, then save to browser cache in correct location, ask me for the pseudocode algorithms if you dont want to write it from scratch)

- Game over screen is bland, add restart button and display more state

- Power pellets make ghosts all dark blue and can be eaten

- THE LEVEL COUNTER ACTUALLY GOES UP (again ask me for algo, i just cba posting it all since its in a 200 page long doc)

- Reset level / round on all pellets eaten

- Lives - only 1 rn

- Feel free to suggest stuff! The best idea i could come up with that was original was to make play as the ghost and chase Pacman, but that was way above the requirements of the exam board, and i waas ttryna bag those marks



`Level indicator:`

Feature: 
In the bottom right corner, the current level of the player is indicated by various images. These are referred to as “fruits”. The fruits in the original Pac-Man are, in order: Cherry, Strawberry, Orange, Apple, Melon, Galaxian Starship, Bell, and Key. Upon reaching the Key, the fruit no longer changes for the remainder of the game (https://www.ssbwiki.com, Accessed 31/9/21)

Visual appearance: 
As seen from the image, the visual appearance of the level indicator changes rapidly as the level increases, up till level 19, after which all of the images are keys.

When it appears:
This is visible at all points, from the start screen till the end, although it changes as the game progresses.

Behaviour: 
Originally, it starts off as a single Cherry.
Every time the player beats a level, a fruit is added, with a maximum of 7 images being displayed at time. As seen from the image on the right, this is how the counter progresses with the level of the game.





`Bonus fruits:`

Feature: 
Varying fruits are spawned during the round, as another goal for Pacman. These are worth more than pellets, hence named “Bonus” fruits.

Visual appearance: 
The appearance of the bonus fruit changes depending on the level, similar to the level counter, and the image shows the different “fruits” that can spawn.

When it appears:
Bonus fruits appear just below the ghost house, as you can see from the image. They appear after Pacman has eaten 70 pellets, and again when the user eats 170 pellets. (https://strategywiki.org, Accessed 31/9/21) 

Behaviour: 
They spawn in at various times throughout the game. Once spawned, they are very similar to pellets, meaning that they disappear when Pacman makes contact with them, and they increment the score.
The value that they are worth, however, is not constant. Originally the cherry is worth 100 points, and this value is increased until the maximum of 5000 points for the Key, at level 13 onwards.

Evaluation of feature:
Although being another goal for Pacman to aim for, they are quite similar to pellets, the main difference being their spawn times, which are very predictable, and their worth. Their worth is also arguably a bit too high, and so, although I will present this idea to my stakeholders, I will suggest some improvements to it, most notably introducing a less predictable spawn time, and adjusting their worth to make the game more fair.




`Game over screen:`

Once the player loses all of Pacman’s lives, the game is over. This triggers the game over screen, as seen in the image. 

At the top of the screen, it shows the player’s score, and the high score, which has so far been visible at all different points in the game anyway, even in the start screen.

It further displays some basic information about the ghosts, showing their names and colours. This is hardcoded and does not change.
Below that, there is the explanation of how much each pellet and power pellet is worth. 

At the bottom, the credit integer and text is visible, as well as the level that the game ended on.


Evaluation of feature:
A game over screen is a useful addition to the game, and the fact that it displays your score, level, and high score is an intelligent addition. It seems, however, that there is some information that is out of place here, such as the nicknames, which would be much better displayed in the starting screen. The high score system could also be improved here, as it only displays the best, rather than a list of the top 10 for example.

I will suggest to my stakeholders that we do use a game over screen, but I will suggest many improvements to it, moving some of the information on the characters and credit, and replacing it with an improved high score system.





`Power Pellets:`

Feature: 
Power Pellet , also known as an Energizer (https://pacman.fandom.com, Accessed 30/9/2021). Although similar to the normal pellet, this is much less common, with only 4 being present per round.

Visual appearance: 
All instances of the Power Pellet are identical. It takes on the look of a sphere, and is a small object in comparison to Pacman, although considerably larger than the Pellets, as seen from the image.


When it appears:
They are all spawned in at the beginning of every round in the game. As there are only 4 of them, and they are much larger than the pellets, they can be distinguished in the maze, as seen from the image, where they are in the four corners of the maze.

Behaviour: 
As Pacman moves around the maze, it will make contact with the Power Pellet, causing it to disappear. The score is also incremented by fifty points, as stated in the game rules.

Once Pacman makes contact with the Power Pellet, it also causes a change in state of the ghosts, where they all enter “Frightened” mode, also known as “Vulnerable” mode.

Similar to the regular Pellets, only once all Power Pellets have been “eaten” by Pacman can the round end.

Any collision with the ghosts does nothing, since they only interact with Pacman, although they do indirectly affect the ghosts through causing them to enter “Frightened” mode


Evaluation of feature:
This feature is essentially an extension of the regular pellets, as they spawn in the maze and also must be eaten by Pacman for the round to end.
The key reason for the existence of Power Pellet is to cause the ghosts to enter Frightened mode, as well as being worth more points for the user.

This is a fun feature purely for the enjoyment of the user, as it provides an extra game mechanic. I will be suggesting to my stakeholders to keep them in the project, using them for the same purpose, although they may be altered slightly in order to change the difficulty of the game.





`Ghosts:`

Feature: 
There are four Ghosts that chase Pacman, “Blinky” (Red), “Pinky” (Pink), “Inky” (Blue), and “Clyde” (Yellow).

Visual appearance: 
As seen from the image, they look very similar, the main difference being their colour. They all share the same white eyes with a blue pupil, and the same shape.


Once they enter frightened mode, they all look the exact same, becoming a dark blue version of themselves. They remain in this visual state until they exit frightened mode, or they are eaten by Pacman.

If they are eaten by Pacman, they also all appear the same, being only a pair of eyes. This pair of eyes then wanders back to the Ghost house, where they become their original, coloured self again.


When they appear:
They are spawned in at the beginning of every round. Blinky starts outside the “house”, with the other three remaining inside the house until they are released. They remain visible throughout the round, moving around to chase Pacman.

Behaviour: 
The four ghosts have the most complex behaviour in the game, even more than Pacman’s.

The basic purpose of the ghosts is to chase Pacman. Once they collide with Pacman, Pacman loses a life, and the round undergoes a soft reset, where the ghosts and Pacman go back to their spawn locations, but the pellets remain in their current state, meaning that they are not replaced if Pacman eats any. They only chase Pacman, however, in their chase state.

There are four states that the ghosts can be in. The aforementioned state, Chase state, Scatter, Frightened and Eaten.

Chase state is when the ghosts use their unique pathfinding to try and make contact with Pacman. The four ghosts utilise slightly different pathfinding so that they do not all take the same path, but rather try and surround Pacman.

The ghosts periodically enter scatter mode, from chase mode. The duration between them entering scatter and chase mode is dependent on the level that the player is currently on. The ghosts, once the round begins or they exit the ghost house, begin in scatter mode, and will typically alternate between scatter and chase mode four times per round. The reason for this is to give the player a break from being chased, so that the difficulty of the game is not too high. As the player beats more and more levels, the chase duration increases, meaning that the player spends more time running from the ghosts and hence the difficulty increases with the level.

In scatter mode, the ghosts ignore the location of Pacman, but rather use their pathfinding to return to their respective corner of the map, as can be seen in the image. They always remain in motion, and so they move in a circular direction around the point.

Frightened state, as previously discussed, is entered when Pacman eats a power pellet. This causes the ghosts to turn blue, and they all change their pathfinding, so that they are no longer chasing Pacman. The new algorithm for travel they use is quite basic, they simply choose a random direction at an intersection. This is done so that they do not run straight into Pacman, but rather run away, yet can still be eaten by the player. They also have a decrease in speed when they enter this mode, in order to make it easier for the player to eat them.

Eaten state is entered only if Pacman manages to collide with them when they are in Frightened state. Once Pacman collides with them, there is a number visible signifying the score the player gained from eating a ghost. In Eaten state, they appear as a pair of eyes, and return to their ghost house, where they return to scatter state.


Evaluation of feature:
The four ghosts are the source of the main difficulty in the game, so they must be kept in the next solution too. Hence, I will present to my stakeholders that we keep them, however I will be changing their pathfinding algorithms, using a more optimal one to increase program efficiency, and so that I can also alter the difficulty of the game as per the stakeholders requests.
















