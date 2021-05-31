const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const app_utils = require(".\\app_utils");
const DButils = require(".\\DButils");

// const TEAM_ID = "85";

async function getFavoriteGames(user_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getNextGame(){
  const now = app_utils.formatDateTime(new Date())
  const next_games = await DButils.execQuery(`SELECT * From Games WHERE GameDateTime >  '${now}' ORDER BY GameDateTime`)
  const next_game = next_games[0]
  next_game['GameDateTime'] = app_utils.formatDateTime(next_game['GameDateTime'])
  return next_game;
}

async function getLatestGames(team_id){
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

async function getUpcomingGames(team_id){
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

exports.getLatestGames = getLatestGames;
exports.getUpcomingGames = getUpcomingGames;
exports.getFavoriteGames = getFavoriteGames;
exports.getNextGame = getNextGame;
exports.removePastGames = removePastGames;
exports.getGamesInfo = getGamesInfo;
exports.getAllPastGames = getAllPastGames;
exports.getAllUpcomingGames = getAllUpcomingGames;