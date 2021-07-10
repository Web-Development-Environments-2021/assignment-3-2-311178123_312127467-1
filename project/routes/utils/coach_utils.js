const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";


/*

The method extract all the relevent info about the coach 
*/
function extractCoachData(coach_info){
  const { coach_id, team_id, country_id, fullname, firstname, lastname,
  image_path, nationality, birthcountry, birthdate } = coach_info;
  return {
    id: coach_id,
    team_id: team_id,
    country_id: country_id,
    fullname: fullname,
    firstname: firstname,
    lastname: lastname,
    nationality: nationality,
    birthplace: birthcountry,
    birthdate: birthdate,
    image_path: image_path
  };
}

/*
Used for coach personal page - get all the info about the coach from the SportMonk API
*/
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





exports.extractCoachData = extractCoachData;
exports.getCoachInfo = getCoachInfo;


