IF OBJECT_ID('dbo.UsersFavoriteTeams', 'U') IS NOT NULL
DROP TABLE dbo.UsersFavoriteTeams
GO

CREATE TABLE dbo.UsersFavoriteTeams
(
    
    username [NVARCHAR](50) NOT NULL,
    teamid [INT] NOT NULL
    PRIMARY KEY(username, teamid)
);
GO
