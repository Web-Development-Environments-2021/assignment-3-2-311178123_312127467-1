-- SELECT * FROM Games JOIN (Select gameid, 
-- string_agg(concat(EventGameTime, ':', [Event]), ', ') as 
-- GameEvents From GamesEvents GROUP BY gameid) as Events 
-- ON Games.gameid = Events.gameid

-- Select * FROM Referees;
-- Select * FROM Games;



-- SELECT DISTINCT Name FROM Referees JOIN (SELECT Referee, GameDateTime FROM Games
-- WHERE Games.GameDateTime = '2021-11-05 21:05:00') as Unavailable 
-- ON Referees.Name = Unavailable.Referee
-- WHERE Referees.Name != Unavailable.Referee

-- SELECT * FROM Referees
-- SELECT Referee, GameDateTime FROM Games
-- -- WHERE Games.GameDateTime = '2021-11-05 21:05:00'
-- SELECT DISTINCT Name FROM Referees FULL OUTER JOIN (SELECT Referee, GameDateTime FROM Games
-- WHERE Games.GameDateTime = '2021-11-05 21:05:00') AS Unavailable
-- ON Referees.Name = Unavailable.Referee WHERE 
-- Unavailable.Referee is NULL
SELECT * FROM Users
-- Referees.Name <> Unavailable.Referee
-- '${game_time}'
