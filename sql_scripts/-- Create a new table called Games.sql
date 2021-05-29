-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
DROP TABLE dbo.Games
IF OBJECT_ID('dbo.GamesEvents', 'U') IS NOT NULL
DROP TABLE dbo.GamesEvents
-- Create table for the all the games
CREATE TABLE dbo.Games
(
    gameid INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    GameDateTime DATETIME NOT NULL,
    HomeTeam [NVARCHAR](50) NOT NULL,
    HomeTeamID INT NOT NULL,
    AwayTeam [NVARCHAR](50) NOT NULL,
    AwayTeamID INT NOT NULL,
    Stadium [NVARCHAR](50) NOT NULL,
    Result [NVARCHAR](50),
  
);

-- Create table for the all the game's events
-- The Event Game time is an int representing minutes from 0
CREATE TABLE dbo.GamesEvents
(
    gameid INT NOT NULL,
    EventGameTime [INT] NOT NULL,
    Event [NVARCHAR](50) NOT NULL,
    PRIMARY KEY (EventGameTime, gameid)

);


