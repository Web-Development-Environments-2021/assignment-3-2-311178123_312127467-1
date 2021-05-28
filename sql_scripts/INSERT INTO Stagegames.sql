use [Users];

INSERT INTO StageGames
   ([StageName],[NextGameDate],[NextGameTime],[NextGameHomeTeam],
   [NextGameAwayTeam])
   
VALUES
   ('Europa League Play-offs - Final','2021-04-03', '19:00:00', 'FC Barcelona', 'Macabi Haifa')
GO 

Select * FROM StageGames;