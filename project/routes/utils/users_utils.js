const DButils = require("./DButils");

async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `insert into UsersFavoritePlayers values ('${user_id}',${player_id})`
  );
}

async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select playerid from UsersFavoritePlayers where userid='${user_id}'`
  );
  return player_ids;
}

exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;
