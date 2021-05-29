var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const coach_utils = require("./utils/coach_utils");
const teams_utils = require("./utils/teams_utils");



router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  let team_details = [];
  try {
    const team_players = await players_utils.getPlayersByTeam(
      req.params.teamId
    );
    const team_coach = await teams_utils.getTeamsInfo(
      [req.params.teamId]
    );
    const team_games = await teams_utils.getGamesInfo(
      req.params.teamId
    ); 
    const past_games = teams_games[0]
    const future_games = teams_games[1]

    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

router.get("/teamFullDetails/:teamname", async (req, res, next) => {
  let team_details = [];
  try {
    const team_details = await players_utils.getPlayersByTeam(
      req.params.teamId
    );
    //we should keep implementing team page.....
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
