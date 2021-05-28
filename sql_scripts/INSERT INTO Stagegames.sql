use [Users];

INSERT INTO StageGames
   ([StageId],[NextGameDate],[NextGameTime],[NextGameHomeTeam],
   [NextGameAwayTeam])
   
VALUES
   (77447993,'2021-04-03', '19:00:00', 'FC Barcelona', 'Macabi Haifa')
GO 

Select * FROM StageGames;