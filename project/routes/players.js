var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");



router.get("/id/:playerId", async (req, res, next) => {
  try {
    const player_info = await players_utils.getPlayersInfo([req.params.playerId])
    res.send(player_info[0]);
  } catch (error) {
    error.status = 400;
    error.message = "Player id not found"
    next(error);
  }
});

router.get("/name/:player_name", async (req, res, next) => {
  try {
    const players_info = await players_utils.searchPlayerByName(req.params.player_name)
    res.send(players_info[0]);
  } catch (error) {
    error.status = 400;
    error.message = "Player name not found"
    next(error);
  }
});

router.get("/search/:player_name", async (req, res, next) => {
  try {
    const players_info = await players_utils.searchPlayerByName(req.params.player_name)
    //const players_info = players_utils.test()
    res.send(players_info);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:player_name/positionId/:player_position_id", async (req, res, next) => {
  try {
    let players_info = await players_utils.searchPlayerByName(req.params.player_name)
    // Filter player with position id not equal to the one the user gave  
    players_info = players_info.filter( player_info => {
    return player_info.position_id == req.params.player_position_id 
})
    res.send(players_info);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:player_name/team/:team_name", async (req, res, next) => {
  try {
    let players_info = await players_utils.searchPlayerByName(req.params.player_name)
    // Filter player with team name not equal to the one the user gave
    players_info = players_info.filter( player_info => {
      return player_info.team == req.params.team_name 
})
    res.send(players_info);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
