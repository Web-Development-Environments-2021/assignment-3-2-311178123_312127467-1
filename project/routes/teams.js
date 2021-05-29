var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const coach_utils = require("./utils/coach_utils");
const teams_utils = require("./utils/teams_utils");


async function getTeamData(team_id){
    let team_details = [];

    // const team_players = await players_utils.getPlayersByTeam(
    //   team_id
    // );
    const team_info = await teams_utils.getTeamsInfo(
      [team_id]
    );
    const past_games = team_info[0]['Latest_Games']
    const future_games = team_info[0]['Upcoming_Games']
    const name = team_info[0]['name']
    const team_coach = team_info[0]['coach']

    team_details.push(name);
    team_details.push(team_coach);
    // team_details.push(team_players);
    team_details.push(past_games);
    team_details.push(future_games);

    return team_details
}


router.get("/id/:teamId", async (req, res, next) => {
  try {
    const team_details = await getTeamData(req.params.teamId)

    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

router.get("/name/:teamname", async (req, res, next) => {
  try {
    const team_id = await teams_utils.getTeamIdByName(req.params.teamname)
    const team_details = await getTeamData(team_id)
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
