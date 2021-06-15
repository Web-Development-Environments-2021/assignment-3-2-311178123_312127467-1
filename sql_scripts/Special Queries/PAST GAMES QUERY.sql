-- SELECT * FROM Games JOIN (Select gameid, 
-- string_agg(concat(EventGameTime, ':', [Event]), ', ') as 
-- GameEvents From GamesEvents GROUP BY gameid) as Events 
-- ON Games.gameid = Events.gameid

SELECT * FROM Users
DELETE FROM Users WHERE username  = 'mrawesome' 
DELETE FROM Users WHERE username  = 'aliceLoveBob' 
SELECT * FROM Users


-- SELECT Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, 
-- Games.Stadium, Games.Result , Events.GameEvents, Games.Referee 
-- FROM Games JOIN (Select gameid, 
-- string_agg(concat(EventGameTime, ':', [Event]), ', ') as 
-- GameEvents From GamesEvents GROUP BY gameid) as Events 
-- ON Games.gameid = Events.gameid
-- WHERE GameDateTime <'${now}' ORDER BY GameDateTime