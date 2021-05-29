IF OBJECT_ID('dbo.UsersFavoriteTeams', 'U') IS NOT NULL
DROP TABLE dbo.UsersFavoriteTeams
GO

CREATE TABLE dbo.UsersFavoriteTeams
(
    
    userid [NVARCHAR](50) NOT NULL,
    team_name [INT] NOT NULL
    PRIMARY KEY(userid, team_name)
);
GO
