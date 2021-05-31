SELECT * From Games
GO
SELECT * From GamesEvents



`SELECT Games.gameid as gameid, Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, 
  Games.Stadium, Games.Result , Events.GameEvents, Games.Referee 
  FROM Games LEFT JOIN (Select gameid, 
  string_agg(concat(EventGameTime, ':', [Event]), ', ') as 
  GameEvents From GamesEvents GROUP BY gameid) as Events 
  ON Games.gameid = Events.gameid
  WHERE GameDateTime <'${now}' ORDER BY GameDateTime `
