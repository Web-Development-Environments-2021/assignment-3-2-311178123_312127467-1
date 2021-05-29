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
    const team_info = await teams_utils.getTeamsInfo(
      [req.params.teamId]
    );
    const past_games = team_info['Latest_Games']
    const future_games = team_info['Upcoming_Games']
    const name = team_info['name']
    const team_coach = team_info['coach']

    team_details.push(name);
    team_details.push(team_coach);
    team_details.push(team_players);
    team_details.push(past_games);
    team_details.push(future_games);
    
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
