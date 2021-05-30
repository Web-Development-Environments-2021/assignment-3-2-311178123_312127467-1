use [Users];

INSERT INTO Games
   ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
   [AwayTeamID], [Stadium],[Result], [Referee])
   
VALUES
   ('2021-04-03 19:00:00', 'Midtjylland', 939, 'København',85, 'Kiryat Eliezer', 
   '0-3', 'Daiyrbek Abdyldayev'),
   ('2021-04-04 19:00:00', 'Midtjylland',939, 'København',85, 'Bernabeu', 
   '0-1','Zainiddin Alimov'),
    ('2021-08-01 19:00:00', 'Midtjylland', 939, 'København',85, 'Bernabeu', NULL,'Denis Shalayev'),
    ('2021-08-03 19:00:00', 'Midtjylland', 939, 'København',85, 'Old Trafford', NULL,NULL)

GO 


Select * FROM Games;
