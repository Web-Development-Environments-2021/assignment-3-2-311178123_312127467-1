var express = require("express");
var router = express.Router();
const games_utils = require("./utils/games_utils");

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

  router.post("/addGame", async (req, res, next) => {
    try {

      const userid =  req.session.userid
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
  

  module.exports = router;