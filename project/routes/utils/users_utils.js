const DButils = require("./DButils");

/*
Add the favorite players to the users DB
*/
async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `insert into UsersFavoritePlayers values ('${user_id}',${player_id})`
  );
}

/*
Add the favorite teams to the users DB
*/
async function MarkTeamAsFavorite(user_id, team_id) {
  await DButils.execQuery(
    `insert into UsersFavoriteTeams values ('${user_id}',${team_id})`
  );
}

/*
Add the favorite games to the users DB
*/
async function MarkGameAsFavorite(user_id, game_data) {
  await DButils.execQuery(
    `insert into UsersFavoriteGames values ('${user_id}','${game_data.GameDateTime}',
    '${game_data.HomeTeam}', '${game_data.AwayTeam}')`
  );
}

/*
Get the favorite players from the users DB
*/
async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select playerid from UsersFavoritePlayers where userid='${user_id}'`
  );
  return player_ids;
}

/*
Get the favorite games from the users DB
*/
async function getFavoriteGames(user_id) {
  const games = await DButils.execQuery(
    `select * from UsersFavoriteGames where userid='${user_id}'`
  );
  return games;
}


/*
Get the favorite teams from the users DB
*/
async function getFavoriteTeams(user_id) {
  const player_ids = await DButils.execQuery(
    `select teamid from UsersFavoriteTeams where userid='${user_id}'`
  );
  return player_ids;
}

exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.MarkTeamAsFavorite = MarkTeamAsFavorite;
exports.MarkGameAsFavorite = MarkGameAsFavorite;

exports.getFavoritePlayers = getFavoritePlayers;
exports.getFavoriteTeams = getFavoriteTeams;
exports.getFavoriteGames = getFavoriteGames;