var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");
const teams_utils = require("./utils/teams_utils");

async function getTeamData(team_id){

    const team_players = await players_utils.getPlayersByTeam(
      team_id
    );
    const team_info = await teams_utils.getTeamsInfo(
      [team_id]
    );
    const past_games = team_info[0]['Latest_Games']
    const future_games = team_info[0]['Upcoming_Games']
    const name = team_info[0]['name']
    const team_coach = team_info[0]['coach']
    const logo = team_info[0]['logo']
    const venue = team_info[0]['stadium']

    return {
      name: name,
      logo: logo,
      coach: team_coach,
      squad: team_players,
      latest: past_games,
      upcoming: future_games,
      stadium: venue
    }
}


router.get("/", async (req, res, next) => {
  try{
    const league_teams = await teams_utils.getAllTeams()
    res.send(league_teams);

  } catch (err) {
    next(error);
  }
})

router.get("/id/:teamId", async (req, res, next) => {
  try {
    // const team_details = await getTeamData(req.params.teamId)
    const team_details = teams_utils.test_data
    res.send(team_details);
  } catch (error) {
    error.status = 400;
    error.message = "Team id not found"
    next(error);
  }
});

router.get("/name/:teamname", async (req, res, next) => {
  try {
    const teams_data = await teams_utils.searchTeamsByName(req.params.teamname)
    const team_id = await teams_utils.extractTeamId(teams_data[0])
    const team_details = await getTeamData(team_id)
    res.send(team_details);
  } catch (error) {
    error.status = 400;
    error.message = "Team name not found"
    next(error);
  }
});

router.get("/search/:teamname", async (req, res, next) => {
  try { 
    const teams_data = await teams_utils.searchTeamsByName(req.params.teamname)
    if (teams_data.length == 0)
      throw {status: 400, message: "Invalid team name"}
    res.send(teams_data);
  } catch (error) {
    next(error);
  }
});

router.get("/teamID/:teamname", async (req, res, next) => {
  try {
    const teams_data = await teams_utils.searchTeamsByName(req.params.teamname)
    const team_id = await teams_utils.extractTeamId(teams_data[0])
    res.send({team_id});
  } catch (error) {
    error.status = 400;
    error.message = "Team name not found"
    next(error);
  }
});

module.exports = router;
