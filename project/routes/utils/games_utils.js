const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const app_utils = require(".\\app_utils");
const DButils = require(".\\DButils");

// const TEAM_ID = "85";

async function getNextGame(){
  const now = app_utils.formatDateTime(new Date())
  const next_games = await DButils.execQuery(`SELECT * From Games WHERE GameDateTime >  '${now}' ORDER BY GameDateTime`)
  const next_game = next_games[0]
  next_game['GameDateTime'] = app_utils.formatDateTime(next_game['GameDateTime'])
  return next_game;
}

async function getTeamLatestGames(team_id){
  let games = []
  const now = app_utils.formatDateTime(new Date())
  const latest_games = await DButils.execQuery(`SELECT * From Games WHERE (AwayTeamID = '${team_id}' OR
  HomeTeamID = '${team_id}') AND GameDateTime <  '${now}' ORDER BY GameDateTime`)
  latest_games.map((game) =>{
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

async function getTeamUpcomingGames(team_id){
  let games = []
  const now = app_utils.formatDateTime(new Date())
  const upcoming_games = await DButils.execQuery(`SELECT * From Games WHERE (AwayTeamID = ${team_id} OR
  HomeTeamID = ${team_id}) AND GameDateTime >  '${now}' ORDER BY GameDateTime`);
  upcoming_games.map((game) =>{
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

async function getAllPastGames(){
  const now = app_utils.formatDateTime(new Date())
  const past_games = await DButils.execQuery(`SELECT Games.gameid, Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, 
  Games.Stadium, Games.Result, Games.Referee
  FROM Games WHERE GameDateTime <'${now}' ORDER BY GameDateTime `);
  return Promise.all(past_games.map(async (game) => {
    game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
    let events = await DButils.execQuery(`SELECT GamesEvents.EventDate, GamesEvents.EventTime,
    GamesEvents.EventGameTime, GamesEvents.Event From GamesEvents 
     WHERE gameid = ${game.gameid}`)
     Object.assign(game, {event_log: events});
     return game
  }));
}

async function removePastGames(){
  const past_games = await getAllPastGames();
  past_games.map(async (game) =>{
    await DButils.execQuery(`DELETE From UsersFavoriteGames WHERE 
    gameid = '${game.gameid}'`);
  });
}

async function getGamesInfo(game_ids){
  let promises = []
  let fav_games = []
  game_ids.map((gameid) =>  
    promises.push(DButils.execQuery(`SELECT * From Games WHERE gameid = ${gameid}`)))

  fav_games= await Promise.all(promises)
  return fav_games.map((game) => {
    game[0]['GameDateTime'] = app_utils.formatDateTime(game[0]['GameDateTime'])
    return game[0]
  })
}

async function getAllUpcomingGames(){
  const games = []
  const now = app_utils.formatDateTime(new Date())
  const future_games = await DButils.execQuery(`SELECT Games.gameid, Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, 
  Games.Stadium, Games.Referee From Games WHERE GameDateTime >'${now}' ORDER BY GameDateTime `);
  future_games.map((game) =>{
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

/*
The method will get all the data of a game and will add it to the games DB
The Game should be a past game
*/
async function addFutureGame(game_date,game_time, HomeTeam, HomeTeamID,AwayTeam,
  AwayTeamID,stadium){
  await DButils.execQuery(`INSERT INTO Games
  ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
    [AwayTeamID], [Stadium])
  VALUES ('${game_date} ${game_time}', '${HomeTeam}',${HomeTeamID},'${AwayTeam}',${AwayTeamID}
   ,'${stadium}')`);
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
  await DButils.execQuery(`SELECT * FROM GamesEvents WHERE gameid = ${game_id} AND EventDate = '${event.event_date}' AND EventTime = '${event.event_time}' 
  AND EventGameTime =  ${event.event_game_time}`)
      /*
        Check if the event already exist. Event is represented by Gameid, Date, Time, GameTime.
        If Yes -> Update it
        Else -> Create a new event
      */
      .then((game_ids) => {
        if (game_ids.length > 0){
           DButils.execQuery(`Update GamesEvents SET Event = '${event.event}' WHERE gameid = ${game_id}
           AND EventDate = '${event.event_date}' AND EventTime = '${event.event_time}' 
          AND EventGameTime =  ${event.event_game_time}`);
        } else {
          DButils.execQuery(`INSERT INTO GamesEvents 
          ([gameid], [EventDate], [EventTime], [EventGameTime], [Event]) 
          Values (${game_id}, '${event.event_date}', '${event.event_time}',
          ${event.event_game_time},'${event.event}')`);
        }
        })
}


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