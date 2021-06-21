var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");



router.get("/id/:playerId", async (req, res, next) => {
  try {
   // const player_info = await players_utils.getPlayersInfo([req.params.playerId])
    const test = [
      {
        id: 5740,
        fullname: "Lawrence Thomas",
        image_path: "https://cdn.sportmonks.com/images/soccer/players/12/5740.png",
        position_id: 1,
        position: "Goalkeeper",
        team: "SønderjyskE",
        team_id: 390,
        nationality: "Australia",
        birthdate: "09/05/1992",
        birthplace: "Australia",
        common_name: "L. Thomas",
        weight: "91 kg",
        height: "191 cm",
      },
    ]
    //res.send(player_info[0]);
    res.send(test[0])
  } catch (error) {
    error.status = 400;
    error.message = "Player id not found"
    next(error);
  }
});

router.get("/name/:player_name", async (req, res, next) => {
  try {
    const players_id = await players_utils.getPlayerIdByName(req.params.player_name)
    const player_info = await players_utils.getPlayersInfo(players_id)
    res.send(player_info);
  } catch (error) {
    error.status = 400;
    error.message = "Player name not found"
    next(error);
  }
});

router.get("/search/:player_name", async (req, res, next) => {
  try {
    const players_ids = await players_utils.getPlayerIdByName(req.params.player_name)
    let players_info = await players_utils.getPlayersInfo(players_ids)
    // Filter for players whos full name match the player_name
    players_info = players_info.map( player_info => {
        return {
          id: player_info.id,
          fullname: player_info.fullname,
          team_name: player_info.team,
          team_id: player_info.team_id,
          image_path: player_info.image_path,
          position_id: player_info.position_id,
          position: player_info.position
    }})
    res.send(players_info);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:player_name/positionId/:player_position_id", async (req, res, next) => {
  try {
    const players_ids = await players_utils.getPlayerIdByName(req.params.player_name)
    let players_info = await players_utils.getPlayersInfo(players_ids)
    // Filter for players whos full name match the player_name and position is position_id
    players_info = players_info.map( player_info => {
      return {
        fullname: player_info.name,
        team_name: player_info.team_name,
        team_id: player_info.team_id,
        image_path: player_info.image,
        position_id: player_info.position_id,
        position: player_info.position
  }})
  // Filter player with position id not equal to the one the user gave
  players_info = players_info.filter( player_info => {
    return player_info.position_id == req.params.player_position_id 
})
    res.send(players_info);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:player_name/team/:team_name", async (req, res, next) => {
  try {
    const players_ids = await players_utils.getPlayerIdByName(req.params.player_name)
    let players_info = await players_utils.getPlayersInfo(players_ids)
    // Filter for players whos full name match the player_name and position is position_id
    players_info = players_info.map( player_info => {
      return {
        fullname: player_info.name,
        team_name: player_info.team_name,
        team_id: player_info.team_id,
        image_path: player_info.image,
        position_id: player_info.position_id,
        position: player_info.position
  }})
  // Filter player with team name not equal to the one the user gave
  players_info = players_info.filter( player_info => {
    return player_info.team_name == req.params.team_name 
})
    res.send(players_info);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
