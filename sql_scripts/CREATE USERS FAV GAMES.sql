IF OBJECT_ID('dbo.UsersFavoriteGames', 'U') IS NOT NULL
DROP TABLE dbo.UsersFavoriteGames
GO

CREATE TABLE dbo.UsersFavoriteGames
(
    
    username [NVARCHAR](50) NOT NULL,
    GameDateTime DATETIME NOT NULL,
    HomeTeam [NVARCHAR](50) NOT NULL,
    AwayTeam [NVARCHAR](50) NOT NULL,
    PRIMARY KEY (username, GameDateTime, HomeTeam, AwayTeam)
);


