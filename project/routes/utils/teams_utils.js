const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const coach_utils = require("./coach_utils");

/*
The method will query the sports api for the teams information
*/

async function getLatestTeamGames(team_id) {
  let latest_games = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "latest",
      api_token: process.env.api_token,
    },
  });
  team.data.latest.data.map((game) =>
    latest_games.push(game.id)
  );
  return latest_games;
}

async function getUpcomingTeamGames(team_id) {
  let upcoming_games = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "upcoming",
      api_token: process.env.api_token,
    },
  });
  team.data.upcoming.data.map((game) =>
    upcoming_games.push(game.id)
  );
  return upcoming_games;
}

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
        let coach = coach_utils.extractCoachData(team_info.data.coach.data)
        const { name} = team_info.data.data.name;
        return {
        name: name,
        coach: coach
        };
    });
}


exports.getTeamsInfo = getTeamsInfo;
