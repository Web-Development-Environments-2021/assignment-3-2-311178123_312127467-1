const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";

/*
The method will query the sports api for the teams information
*/
async function getTeamsInfo(teams_ids_list) {
    let promises = [];
    teams_ids_list.map((id) =>
      promises.push(
        axios.get(`${api_domain}/teams/${id}`, {
          params: {
            api_token: process.env.api_token,
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
    // for the coach (with include see getPlayerIdsByTeam in players_urils for ref) etc...
    // For example
return teams_info.map((teams_info) => {
    const { name} = teams_info.data.data;
    return {
    name: name,
    };
});
}


exports.getTeamsInfo = getTeamsInfo;
