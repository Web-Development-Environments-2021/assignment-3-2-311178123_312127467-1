const app_utils = require("./app_utils");
const DButils = require("./DButils");
const teams_utils = require("./teams_utils");

/*
The method will query the games DB for the next scheduled game
*/
async function getNextGame(){
  const now = app_utils.formatDateTime(new Date())
  const next_games = await DButils.execQuery(`SELECT Games.gameid, Games.GameDateTime, Games.HomeTeam, Games.HomeTeamID,
  Games.AwayTeam, Games.AwayTeamID , Games.Stadium, Games.Referee From Games WHERE GameDateTime >  '${now}' ORDER BY GameDateTime`)
  const next_game = next_games[0]
  // Add the GMT with the time the server returns
  next_game['GameDateTime'].setTime(next_game['GameDateTime'].getTime() + next_game['GameDateTime'].getTimezoneOffset()*60*1000);;
  // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
  next_game['GameDateTime'] = app_utils.formatDateTime(next_game['GameDateTime'])
  return next_game;
}

/*
The method will query the games DB for the team's past games (If there are some).
*/
async function getTeamLatestGames(team_id){
  let games = await getAllPastGames()
  games = games.filter((game) => game.AwayTeamID == team_id || game.HomeTeamID == team_id)
  return games
}

/*
The method will query the games DB for the team's upcoming  games (If there are some).
*/
async function getTeamUpcomingGames(team_id){
  let games = []
  const now = app_utils.formatDateTime(new Date())
  const upcoming_games = await DButils.execQuery(`SELECT * From Games WHERE (AwayTeamID = ${team_id} OR
  HomeTeamID = ${team_id}) AND GameDateTime >  '${now}' ORDER BY GameDateTime`);
  upcoming_games.map((game) =>{
      // Add the GMT with the time the server returns
      game['GameDateTime'].setTime(game['GameDateTime'].getTime() + game['GameDateTime'].getTimezoneOffset()*60*1000);;
      // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

/*
  The method will query the games DB all the games that were already played with regard to now
*/
async function getAllPastGames(){
  const now = app_utils.formatDateTime(new Date())
  const past_games = await DButils.execQuery(`SELECT Games.gameid, Games.GameDateTime, Games.HomeTeam, Games.HomeTeamID,
  Games.AwayTeam, Games.AwayTeamID, Games.Stadium, Games.Referee, Games.Result
  FROM Games WHERE GameDateTime <'${now}' ORDER BY GameDateTime `);

  return Promise.all(past_games.map(async (game) => {
    // Add the GMT with the time the server returns
    game['GameDateTime'].setTime(game['GameDateTime'].getTime() + game['GameDateTime'].getTimezoneOffset()*60*1000);;
    // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
    game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])

    // Get all the events assign to the game
    let events_ids = await DButils.execQuery(`SELECT eventid FROM GamesEvents WHERE gameid = ${game.gameid}`)
    // Build the list of events ids for the where clause -> (1,2,3,...)
    let query_ids = "("
    events_ids.map(event => query_ids += `${event.eventid},`)
    query_ids = query_ids.replace(/,\s*$/, ")");

    // Assign the event log for each game. The same as joining the two tables (Games and GamesEvents)
    let events = await DButils.execQuery(`SELECT Events.EventDate, Events.EventTime,
    Events.EventGameTime, Events.EventDesc From Events 
     WHERE eventid IN ${query_ids}`)
     Object.assign(game, {event_log: events});
     return game
  }));
}

/*
  The method will query the games DB all the games that are not yet played with regard to now
*/
async function getAllUpcomingGames(){
  const games = []
  const now = app_utils.formatDateTime(new Date())
  const future_games = await DButils.execQuery(`SELECT Games.gameid, Games.GameDateTime, Games.HomeTeam, Games.HomeTeamID,
  Games.AwayTeam, Games.AwayTeamID , Games.Stadium, Games.Referee From Games WHERE GameDateTime >'${now}' ORDER BY GameDateTime `);
  future_games.map((game) =>{
      // Add the GMT with the time the server returns
      game['GameDateTime'].setTime(game['GameDateTime'].getTime() + game['GameDateTime'].getTimezoneOffset()*60*1000);;
      // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

/*
  The method try to delete all games that are past games from the users favorite games.
  Meaning the user can only have future games as his favorite games.
*/
async function removePastGames(){
  const past_games = await getAllPastGames();
  past_games.map(async (game) =>{
    await DButils.execQuery(`DELETE From UsersFavoriteGames WHERE 
    gameid = '${game.gameid}'`);
  });
}

/*
  The method will query the DB for all the games that are mentioned in the game_ids param.
  The games are returned with the date formated
*/
async function getGamesInfo(game_ids){
  let promises = []
  let fav_games = []
  game_ids.map((gameid) =>  
    promises.push(DButils.execQuery(`SELECT * From Games WHERE gameid = ${gameid}`)))
  fav_games= await Promise.all(promises)

  return fav_games.map((game) => {
    // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
    game[0]['GameDateTime'] = app_utils.formatDateTime(game[0]['GameDateTime'])
    return game[0]
  })
}

/*
The method will get all the data of a game and will add it to the games DB
The Game should be a past game
*/
async function addFutureGame(game_date,game_time, HomeTeam, HomeTeamID,AwayTeam,
  AwayTeamID,stadium,referee){
    await DButils.execQuery(`INSERT INTO Games
    ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
      [AwayTeamID], [Stadium], [Referee])
    VALUES ('${game_date} ${game_time}', '${HomeTeam}',${HomeTeamID},'${AwayTeam}',${AwayTeamID}
    ,'${stadium}','${referee}')`);
}

/*
The method will get a score and a game_id and will update the game with the relevent score.
The game should be a past game. The validtion is implemented in the client side.
*/
async function addScoreToGame(game_id,score){
  await DButils.execQuery(`Update Games SET Result = '${score}' WHERE gameid = ${game_id}`);
}

/*
The method will get an event and a game_id and will update the game with the given event.
The game should be a past game. The validtion is implemented in the client side.
If the event exist it will be updated with the new value
*/
async function addEventToGame(game_id,event){
    let events_ids = await DButils.execQuery(`SELECT GamesEvents.gameid, Events.eventid FROM Events JOIN GamesEvents ON Events.eventid = GamesEvents.eventid
    WHERE GamesEvents.gameid = ${game_id} AND Events.EventDate = '${event.event_date}'
    AND Events.EventTime = '${event.event_time}' 
    AND Events.EventGameTime =  ${event.event_game_time}`)
      /*
        Check if the event already exist. Event is represented by Eventid.
        If Yes -> Update it
        Else -> Create a new event
      */
    if (events_ids.length > 0) 
      await DButils.execQuery(`Update Events SET EventDesc = '${event.event}' WHERE eventid = ${events_ids[0].eventid}`);
    else{
      await DButils.execQuery(`INSERT INTO Events 
          ([EventDate], [EventTime], [EventGameTime], [EventDesc]) 
          Values ('${event.event_date}', '${event.event_time}',
          ${event.event_game_time},'${event.event}')`)
      // Update the new event in the GamesEvents relationship table.
      // The following command return the last isnerted item to a table
      const last_event = await DButils.execQuery(`SELECT eventid FROM Events
       WHERE EventDate = '${event.event_date}' AND EventTime = '${event.event_time}' AND EventGameTime =  ${event.event_game_time}`)
      DButils.execQuery(`INSERT INTO GamesEvents ([gameid], [eventid]) VALUES (${game_id}, ${last_event[0].eventid})`)
    }
}

/*
The method will query the DB to see if the teams have a game in the datetime that was given
*/
async function checkIfMathcExists(game_time,home_team_id, away_team_id){
  let result = await DButils.execQuery(`SELECT gameid FROM Games Where GameDateTime = '${game_time}' AND
  ((HomeTeamID = ${home_team_id} AND AwayTeamID = ${away_team_id}) OR
  (HomeTeamID = ${away_team_id} AND AwayTeamID = ${home_team_id}))`)
  if(result.length > 0)
    return true

  return false
}

/*
The method will query the DB for all the games
*/
async function getAllGames(){
  return await DButils.execQuery("SELECT * FROM Games");
}

/*
The method will return the list of referees available in this time of game
*/
async function getAvailableReferees(game_time){
  let refs =  await DButils.execQuery(`SELECT DISTINCT Name FROM Referees FULL OUTER JOIN (SELECT Referee, GameDateTime FROM Games
    WHERE Games.GameDateTime = '${game_time}') AS Unavailable
    ON Referees.Name = Unavailable.Referee WHERE 
    Unavailable.Referee is NULL`);
  return refs
}

/*
The method will query the DB to return the gameID of the given team ids
*/
async function getGameID(game_time,home_team_id, away_team_id){
  let result = await DButils.execQuery(`SELECT gameid FROM Games Where GameDateTime = '${game_time}' AND
  ((HomeTeamID = ${home_team_id} AND AwayTeamID = ${away_team_id}) OR
  (HomeTeamID = ${away_team_id} AND AwayTeamID = ${home_team_id}))`)
  if(result.length > 0)
    return result[0]['gameid'];
  return false
}

/*
The method will return the list of teams available in this time of game
*/
async function getAvailableTeams(game_time){
  let allTeams = await teams_utils.getAllTeams();
  let Unavailables =  await DButils.execQuery(`SELECT GameDateTime, HomeTeam, AwayTeam
    FROM Games WHERE Games.GameDateTime = '${game_time}'`);
  let indexesToDelete = [];
  Unavailables.map((Unavailable) => {
    // remove teams that are not available
    allTeams.map((teamObj) => {
      let toDelete = teamObj["team_name"] == Unavailable['HomeTeam'] || teamObj["team_name"] == Unavailable['AwayTeam']
      if(toDelete)
        indexesToDelete.push(allTeams.indexOf(teamObj))
    })
  })
  indexesToDelete.sort(function(a, b){return a-b});
  for (var i = indexesToDelete.length -1; i >= 0; i--)
    allTeams.splice(indexesToDelete[i], 1);
  return allTeams
}

exports.getAllGames = getAllGames;
exports.getTeamLatestGames = getTeamLatestGames;
exports.getTeamUpcomingGames = getTeamUpcomingGames;
exports.getNextGame = getNextGame;
exports.removePastGames = removePastGames;
exports.getGamesInfo = getGamesInfo;
exports.getAllPastGames = getAllPastGames;
exports.getAllUpcomingGames = getAllUpcomingGames;
exports.addFutureGame = addFutureGame;
exports.addScoreToGame = addScoreToGame
exports.addEventToGame = addEventToGame
exports.checkIfMathcExists = checkIfMathcExists
exports.getAvailableReferees = getAvailableReferees
exports.getGameID = getGameID
exports.getAvailableTeams = getAvailableTeams