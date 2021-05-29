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
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
