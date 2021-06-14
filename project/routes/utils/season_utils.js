const axios = require("axios");
const league_utils = require("./league_utils");

/*
The method should be used in the start of the program. It will set the current season dates according to Superliga
league's data from the API.
*/
async function getCurrentSeasonDate(){
    const league_details = await axios.get(
      `https://soccer.sportmonks.com/api/v2.0/leagues/${league_utils.LEAGUE_ID}`,
      {
        params: {
          include: "season",
          api_token: process.env.api_token,
        },
      }
    );
  
    let current_season_date = league_details.data.data.season.data.name.split("/");
    return current_season_date.map(date => {return parseInt(date)}) 
  }

/*
Check if the game's date match the current season date
The argument should be datetime object
*/
async function checkDateMatchCurrentSeason(datetimeObj){
    const current_season_date = await getCurrentSeasonDate()
    return current_season_date[0] == datetimeObj.getFullYear() ||  datetimeObj.getFullYear() == current_season_date[1] 
}

/*
 Extract all the teams in the seasonId given.
 All the teams will return as an array of {team_id, team_name}
*/
async function getTeamsBySeasonId(seasonId){
  const teams = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/teams/season/${seasonId}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  return teams.data.data.map(team => {return {team_id: team.id, team_name: team.name}})
}

exports.checkDateMatchCurrentSeason = checkDateMatchCurrentSeason
exports.getTeamsBySeasonId = getTeamsBySeasonId
