use [Users];

INSERT INTO Games
   ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
   [AwayTeamID], [Stadium],[Result])
   
VALUES
   ('2021-04-03 19:00:00', 'Midtjylland', 939, 'København',85, 'Kiryat Eliezer', 
   '0-3'),
   ('2021-04-04 19:00:00', 'Midtjylland',939, 'København',85, 'Bernabeu', 
   '0-1'),
    ('2021-08-01 19:00:00', 'Midtjylland', 939, 'København',85, 'Bernabeu', NULL),
    ('2021-08-03 19:00:00', 'Midtjylland', 939, 'København',85, 'Old Trafford', NULL)

GO 


Select * FROM Games;
