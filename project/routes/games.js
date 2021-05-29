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
  
  module.exports = router;