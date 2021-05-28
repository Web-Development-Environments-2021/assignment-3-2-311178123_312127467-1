IF OBJECT_ID('dbo.StageGames', 'U') IS NOT NULL
DROP TABLE dbo.StageGames

-- Create table for the all the games
CREATE TABLE dbo.StageGames
(
    StageName [NVARCHAR](50) NOT NULL PRIMARY KEY,
    NextGameDate DATETIME NOT NULL,
    NextGameTime TIME NOT NULL,
    NextGameHomeTeam [NVARCHAR](50) NOT NULL,
    NextGameAwayTeam [NVARCHAR](50) NOT NULL,
);

GO