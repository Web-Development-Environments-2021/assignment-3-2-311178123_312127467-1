IF OBJECT_ID('dbo.GamesEvents', 'U') IS NOT NULL
DROP TABLE dbo.GamesEvents
-- Create table for the all the games

-- Create table for the all the game's events
-- The Event Game time is an int representing minutes from 0
CREATE TABLE dbo.GamesEvents
(
    gameid INT NOT NULL,
    EventDate [NVARCHAR](50) NOT NULL,
    EventTime [NVARCHAR](50) NOT NULL,
    EventGameTime [INT] NOT NULL,
    Event [NVARCHAR](50) NOT NULL,
    PRIMARY KEY (EventGameTime, gameid)
);