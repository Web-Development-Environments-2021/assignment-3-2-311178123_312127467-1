var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.userid) {
    DButils.execQuery("SELECT userid FROM Users")
      .then((users) => {
        if (users.find((x) => x.userid === req.session.userid)) {
          req.userid = req.session.userid;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
router.post("/addFavoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.userid;
    const player_id = req.body.player_id;
    await users_utils.markPlayerAsFavorite(user_id, player_id);
    res.status(201).send("The player successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with teamId and save this team in the favorites list of the logged-in user
 */
 router.post("/addFavoriteTeams", async (req, res, next) => {
  try {
    const user_id = req.session.userid;
    const team_id = req.body.team_id;
    await users_utils.MarkTeamAsFavorite(user_id, team_id);
    res.status(201).send("The team successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});



/**
 * This path returns the favorites players that were saved by the logged-in user
 */
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const userid = req.session.userid;
    let favorite_players = {};
    const player_ids = await users_utils.getFavoritePlayers(userid);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.playerid)); //extracting the players ids into array
    const results = await players_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
