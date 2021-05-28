
INSERT INTO GamesEvents
   ([GameDate],[GameTime],[HomeTeam],[AwayTeam],
   [EventGameTime],[Event])
   
VALUES
   ('2021-04-03', '19:00:00', 'FC Barcelona', 'Macabi Haifa', 10, 
   'Goal Ruven Atar'),
   ('2021-04-03', '19:00:00', 'FC Barcelona', 'Macabi Haifa', 44, 
   'Goal Ruven Atar'),
    ('2021-04-03', '19:00:00', 'FC Barcelona', 'Macabi Haifa', 91, 
   'Goal Ruven Atar'),
    ('2021-04-04', '19:00:00', 'FC Barcelona', 'Hapoel Beersheba', 73, 
   'Red Card Messi'),
    ('2021-04-04', '19:00:00', 'FC Barcelona', 'Hapoel Beersheba', 90,
     'Goal Ben Sahar')

GO

Select * FROM GamesEvents;

GO