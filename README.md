two scripts specifically designed for tagpro's swiss tournaments:

1. a python script adapted from @ankhmorporkian's original to import signups from a reddit signup thread using PRAW - script will output four arrays representing players and their position preferences (o, d, o/d, d/o) AND write a list of players and positions to a file 'positions.txt'

2. a js script which takes the python script's output (4 arrays) and provides a completely randomized list of teams, unformatted for the purpose of copying and pasting into the official swiss tourney google doc - this script was also adapted from ankh's teams_create.py, which was a fine script for a tournament with one randomization, but clumped o/d and d/o players together when randomizing more than once
