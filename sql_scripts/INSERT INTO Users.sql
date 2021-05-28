
-- Query the total count of employees
SELECT * FROM dbo.Users;
-- Query all employee information
GO
INSERT INTO UsersFavoritePlayers ([username], [playerid])
VALUES ('eden6',172104), ('eden6',5627), ('guy1',5627) 
SELECT * FROM dbo.UsersFavoritePlayers;


INSERT INTO UsersFavoriteTeams ([username], [teamid])
VALUES ('eden6',939), ('guy1',939) 
SELECT * FROM dbo.UsersFavoritePlayers;
GO

INSERT INTO UsersFavoriteGames ([username], [GameDateTime],
[HomeTeam], [AwayTeam])
VALUES ('eden6','2021-04-03 19:00:00', 'FC Barcelona', 'Macabi Haifa'),
 ('guy1','2021-04-04 19:00:00', 'FC Barcelona', 'Hapoel Beersheba') 
SELECT * FROM dbo.UsersFavoritePlayers;
GO
