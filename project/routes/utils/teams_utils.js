const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const coach_utils = require("./coach_utils");
const game_utils = require("./games_utils");


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
    // Guy - Need to add more queries with include (see getPlayerIdsByTeam in players_urils for ref) 
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
    return extractRelevantTeamData(teams_info);
}

/*
The method will extract all the relavent data about the team as it is 
mentioned in the api
*/

function extractRelevantTeamData(teams_info) {
    // Guy - Need to extract all the relavent info and add more queries to the sport api
    // for the coach etc...
    // For example
    return teams_info.map((team_info) => {
        let coach = coach_utils.extractCoachData(team_info.data.data.coach.data);
        let upcoming_games = game_utils.getUpcomingGames(team_info.data.data.id);
        let latest_games = game_utils.getLatestGames(team_info.data.data.id);
        let
        const { name} = team_info.data.data.name;
        return {
        name: name,
        coach: coach,
        Latest_Games: latest_games,
        Upcoming_Games: upcoming_games
        };
    });
}


exports.getTeamsInfo = getTeamsInfo;
