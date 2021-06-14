var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");

router.get("/getDetails", async (req, res, next) => {
  try {
    //const league_details = await league_utils.getLeagueDetails();
    const test_data = {
      league_name: "Superliga",
      current_season_name: "2021/2022",
      current_stage_name: "Conference League",
      stage_next_game: {
        gameid: 7,
        GameDateTime: "2021-08-01 22:0:0",
        HomeTeam: "SønderjyskE",
        HomeTeamID: 390,
        AwayTeam: "Midtjylland",
        AwayTeamID: 939,
        Stadium: "Sydbank Park",
        Result: null,
        Referee: "Denis Shalayev",
      },
      league_logo: "https://cdn.sportmonks.com/images/soccer/leagues/271.png",
    }
    // res.send(league_details);
    res.send(test_data);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
