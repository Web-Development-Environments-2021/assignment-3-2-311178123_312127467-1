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
Get the favorite players from the users DB
*/
async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select playerid from UsersFavoritePlayers where userid='${user_id}'`
  );
  return player_ids;
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

exports.getFavoritePlayers = getFavoritePlayers;
exports.getFavoriteTeams = getFavoriteTeams;