-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
DROP TABLE dbo.Games

-- Create table for the all the games
CREATE TABLE dbo.Games
(
    GameDate DATE NOT NULL,
    GameTime TIME NOT NULL,
    HomeTeam [NVARCHAR](50) NOT NULL,
    AwayTeam [NVARCHAR](50) NOT NULL,
    Stadium [NVARCHAR](50) NOT NULL,
    Result [NVARCHAR](50),
    PRIMARY KEY (GameDate,GameTime, HomeTeam, AwayTeam)
);

-- Create table for the all the game's events
-- The Event Game time is an int representing minutes from 0
CREATE TABLE dbo.GamesEvents
(
    GameDate DATETIME NOT NULL,
    GameTime TIME NOT NULL,
    HomeTeam [NVARCHAR](50) NOT NULL,
    AwayTeam [NVARCHAR](50) NOT NULL,
    EventGameTime [INT] NOT NULL,
    EventDescrib [NVARCHAR](50) NOT NULL,
    PRIMARY KEY (GameDate,GameTime, HomeTeam, AwayTeam)

);


