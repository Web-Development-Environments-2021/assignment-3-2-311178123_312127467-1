var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");



router.get("/id/:playerId", async (req, res, next) => {
  try {
    const player_info = await players_utils.getPlayersInfo([req.params.playerId])

    res.send(player_info[0]);
  } catch (error) {
    next(error);
  }
});

router.get("/name/:player_name", async (req, res, next) => {
  try {
    const player_id = await players_utils.getPlayerIdByName(req.params.player_name)
    const player_info = await players_utils.getPlayersInfo([player_id])
    res.send(player_info);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:player_name", async (req, res, next) => {
  try {
    const player_id = await players_utils.getPlayerIdByName(req.params.player_name)
    let player_info = await players_utils.getPlayersInfo([player_id])
    // Only one player will return the in array
    player_info = player_info[0];
    // let player_info = require("./utils/data_examples/player.json")
    player_info = {
      fullname: player_info.name,
      team_name: player_info.team_name,
      team_id: player_info.team_id,
      image: player_info.image,
      position_id: player_info.position
    }
    res.send(player_info);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
