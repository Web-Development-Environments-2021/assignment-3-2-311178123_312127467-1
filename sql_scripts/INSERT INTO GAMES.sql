use [Users];

INSERT INTO Games
   ([GameDate],[GameTime],[HomeTeam],[AwayTeam],
   [Stadium],[Result])
   
VALUES
   ('2021-04-03', '19:00:00', 'FC Barcelona', 'Macabi Haifa', 'Kiryat Eliezer', 
   '0-3'),
   ('2021-04-04', '19:00:00', 'FC Barcelona', 'Hapoel Beersheba', 'Bernabeu', 
   '0-1'),
    ('2021-08-01', '19:00:00', 'FC Barcelona', 'Real Madrid', 'Bernabeu', NULL),
    ('2021-08-03', '19:00:00', 'FC Barcelona', 'Manchester United', 'Old Trafford', NULL)

GO 


Select * FROM Games;
