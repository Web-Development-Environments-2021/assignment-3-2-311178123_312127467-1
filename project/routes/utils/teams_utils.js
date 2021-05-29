const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const coach_utils = require("./coach_utils");
const game_utils = require("./games_utils");
const players_utils = require("./players_utils");

/*
The method will query the sports api for the team's name and return the id
*/
async function getTeamIdByName(team_name){
  const team_data = await axios.get(`${api_domain}/teams/search/${team_name}`, {
    params: {
      api_token: process.env.api_token,
    },
  })

  return team_data.data.data[0].id;
}

/*
The method will query the sports api for the teams information
*/
async function getGamesInfo(team_id) {
  let upcoming = getUpcomingTeamGames(team_id)
  let latest = getLatestTeamGames(team_id)
  let promises_upcoming = [];
  let promises_latest = [];
  upcoming.map((id) =>
    promises_upcoming.push(
      axios.get(`${api_domain}/teams/${team_id}/upcoming/${id}`, {
        params: {
          api_token: process.env.api_token,
        },
      })
    )
  );
  latest.map((id) =>
    promises_latest.push(
      axios.get(`${api_domain}/teams/${team_id}/latest/${id}`, {
        params: {
          api_token: process.env.api_token,
        },
      })
    )
  );
  let latest_info = await Promise.all(promises_latest);
  let upcoming_info = await Promise.all(promises_upcoming);
  return [extractRelevantPlayerData(latest_info),extractRelevantPlayerData(upcoming_info)];
}

async function getTeamsInfo(teams_ids_list) {
    let teams_data = []
    let promises = [];
    teams_ids_list.map((id) =>
      promises.push(
        axios.get(`${api_domain}/teams/${id}`, {
          params: {
            api_token: process.env.api_token,
            include: "coach"
          },
        })
      )
    );
    let teams_info = await Promise.all(promises);
    return await extractRelevantTeamData(teams_info);
}

/*
The method will extract all the relavent data about the team as it is 
mentioned in the api
*/

async function extractRelevantTeamData(teams_info) {

   let teams_data = []

    return await Promise.all(teams_info.map(async (team_info) => {
        let coach = coach_utils.extractCoachData(team_info.data.data.coach.data);
        let upcoming_games = await game_utils.getUpcomingGames(team_info.data.data.id);
        let latest_games = await game_utils.getLatestGames(team_info.data.data.id);
        const name = team_info.data.data.name;
        return {
        name: name,
        coach: coach,
        Latest_Games: latest_games,
        Upcoming_Games: upcoming_games
        };
    }));

}



exports.getTeamsInfo = getTeamsInfo;
exports.getTeamIdByName = getTeamIdByName;
