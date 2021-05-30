use [Users];

INSERT INTO Games
   ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
   [AwayTeamID], [Stadium],[Result], [Referee])
   
VALUES
   ('2021-01-03 19:00:00', 'Midtjylland', 939, 'København',85, 'MCH Arena', 
   '0-3', 'Daiyrbek Abdyldayev'),
   ('2021-01-10 19:00:00', 'Midtjylland',939, 'København',85, 'MCH Arena', 
   '0-1','Zainiddin Alimov'),
   ('2021-01-13 19:00:00', 'Toronto',111, 'København',85, 'BMO Field', 
   '0-1','Daiyrbek Abdyldayev'),
   ('2021-01-20 19:00:00', 'Midtjylland',939, 'Toronto',111, 'MCH Arena', 
   '0-0','Denis Shalayev'),
   ('2021-01-13 19:00:00', 'Toronto',111, 'Beijing Renhe',85, 'BMO Field', 
   '0-0','Daiyrbek Abdyldayev'),
   ('2021-02-03 19:00:00', 'Toronto',111, 'Beijing Renhe',111, 'BMO Field', 
   '1-2','Zainiddin Alimov'),
    ('2021-08-01 19:00:00', 'København', 85, 'Midtjylland',939, 'Parken', NULL,'Denis Shalayev'),
    ('2021-08-03 19:00:00', 'Toronto', 111, 'Midtjylland',939, 'BMO Field', NULL,'Denis Shalayev'),
     ('2021-08-10 19:00:00', 'Midtjylland', 939, 'Toronto',111, 'MCH Arena', NULL,NULL),
    ('2021-10-01 14:30:00', 'København', 939, 'Toronto',111, 'Parken', NULL,NULL),
    ('2021-10-03 21:05:00', 'København', 939, 'Beijing Renhe',200, 'Parken', NULL,NULL),
   ('2021-11-05 21:05:00', 'København', 939, 'Beijing Renhe',200, 'Parken', NULL,NULL)
GO 


Select * FROM Games;
