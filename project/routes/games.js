var express = require("express");
var router = express.Router();
const league_utils = require("./utils/games_utils");

router.get("/currentStageGames", async (req, res, next) => {
    try {
      const league_details = await league_utils.getLeagueDetails();
      res.send(league_details);
    } catch (error) {
      next(error);
    }
  });
  

async function getPastGames(){
  const now = app_utils.formatDateTime(new Date())
  const latest_games = await DButils.execQuery(`SELECT Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, Games.Stadium, Games.Result, GamesEvents.Event
  From Games WHERE (AwayTeamID = '${team_id}' OR
  HomeTeamID = '${team_id}') AND GameDateTime <  '${now}' ORDER BY GameDateTime`)
  latest_games.map((game) =>
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
    )
}

  module.exports = router;