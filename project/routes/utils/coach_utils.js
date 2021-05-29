const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";


function extractCoachData(coach_info){
  const { fullname, image_path, nationality } = coach_info;
  return {
    name: fullname,
    image: image_path,
    nationality: nationality,
  };
}

function getCoachInfo(coachId){
  coach_info = axios.get(`${api_domain}/coaches/${coachId}`, {
    params: {
      api_token: process.env.api_token,
    },
  })
  return (coach_info) => {
    extractCoachData(coach_info);
  };
}

// function getCoachData(coachId) {
//   return players_info.map((player_info) => {
//     const { fullname, image_path, nationality } = player_info.data.data;
//     const { name } = player_info.data.data.team.data;
//     return {
//       name: fullname,
//       image: image_path,
//       position: position_id,
//       team_name: name,
//     };
//   });
// }

async function getCoachIdByTeam(team_id) {
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "coach",
      api_token: process.env.api_token,
    },
  });
  coach_id = team.data.data.coach.data.coach_id;
  return coach_id;
}

async function getCoachByTeam(team_id) {
  let coachId = await getCoachIdByTeam(team_id);
  let coach_info = await getCoachInfo(coachId);
  return coach_info;
}

exports.extractCoachData = extractCoachData;


