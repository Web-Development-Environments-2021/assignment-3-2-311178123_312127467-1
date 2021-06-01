var express = require("express");
var router = express.Router();
const games_utils = require("./utils/games_utils");
const DButils = require("./utils/DButils");



router.get("/currentStageGames", async (req, res, next) => {
    try {
      const past_games = await games_utils.getAllPastGames();
      const future_games = await games_utils.getAllUpcomingGames();
      const result = {
        latest: past_games,
        upcoming: future_games
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  });



  /**
 * Check if the user is a league representive by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.userid) {
    try{
      const users = await DButils.execQuery("SELECT userid FROM LeagueRepsUsers")
      if (users.find((x) => x.userid === req.session.userid)) {
        next();
      }
      else 
        res.status(401).send("Privilege Error: The following action is only permitted to league representives");
    
  } catch (error) {
      next(error);}
    }
});

  router.post("/addGame", async (req, res, next) => {
    try {

      // Check if the user is a leagure representive
      const userid =  req.session.userid
      const game_date = req.body.game_date;
      // TODO MAKE SURE THE GAME IS FUTURE IN ORDER TO ADD
      const game_time = req.body.game_time
      const home_team = req.body.home_team
      const home_team_id = req.body.home_team_id
      const away_team = req.body.away_team
      const away_team_id = req.body.away_team_id
      const stadium = req.body.stadium

      await games_utils.addFutureGame(game_date,game_time,home_team,home_team_id,away_team,
        away_team_id,stadium)

      res.status(201).send("The game was successfully added");
      } catch (error) {
      next(error);
    }
  });
  

  router.put("/addScore", async (req, res, next) => {
    try {

      const game_id =  req.body.game_id
      const game_score = req.body.score;
      games_utils.addScoreToGame(game_id, game_score);
      res.status(201).send("The game was updated");
      } catch (error) {
      next(error);
    }
  });

  router.put("/addEvent", async (req, res, next) => {
    try {

      const game_id =  req.body.game_id
      const event = req.body.event;
      await games_utils.addEventToGame(game_id, event)
      res.status(201).send("The game was updated");
      } catch (error) {
      next(error);
    }
  });

  module.exports = router;