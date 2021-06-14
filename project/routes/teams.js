var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");
const teams_utils = require("./utils/teams_utils");

async function getTeamData(team_id){

    const team_players = await players_utils.getPlayersByTeam(
      team_id
    );
    const team_info = await teams_utils.getTeamsInfo(
      [team_id]
    );
    const past_games = team_info[0]['Latest_Games']
    const future_games = team_info[0]['Upcoming_Games']
    const name = team_info[0]['name']
    const team_coach = team_info[0]['coach']
    const logo = team_info[0]['logo']

    return {
      name: name,
      logo: logo,
      coach: team_coach,
      squad: team_players,
      latest: past_games,
      upcoming: future_games
    }
}


router.get("/getAllTeams", async (req, res, next) => {
  try{
    const league_teams = await teams_utils.getAllTeams()
    res.send(league_teams);

  } catch (err) {
    next(error);
  }
})

router.get("/id/:teamId", async (req, res, next) => {
  try {
    //const team_details = await getTeamData(req.params.teamId)
    const test = {
      name: "SønderjyskE",
      logo: "https://cdn.sportmonks.com/images//soccer/teams/6/390.png",
      coach: {
        name: "Glen Riddersholm",
        image: "https://cdn.sportmonks.com/images/soccer/players/5/459045.png",
        nationality: "Denmark",
      },
      squad: [
        {
          name: "Lawrence Thomas",
          image: "https://cdn.sportmonks.com/images/soccer/players/12/5740.png",
          position_id: 1,
          position: "Goalkeeper",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Australia",
          birthdate: "09/05/1992",
          birthcountry: "Australia",
          common_name: "L. Thomas",
          weight: "91 kg",
          height: "191 cm",
        },
        {
          name: "Nicolai Flø",
          image: "https://cdn.sportmonks.com/images/soccer/players/3/84003.png",
          position_id: 1,
          position: "Goalkeeper",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "09/08/1995",
          birthcountry: "Denmark",
          common_name: "N. Flø",
          weight: "91 kg",
          height: "190 cm",
        },
        {
          name: "Stefan Gartenmann",
          image: "https://cdn.sportmonks.com/images/soccer/players/2/27618.png",
          position_id: 2,
          position: "Defender",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "02/02/1997",
          birthcountry: "Denmark",
          common_name: "S. Gartenmann",
          weight: "75 kg",
          height: "185 cm",
        },
        {
          name: "Emil Holm",
          image: "https://cdn.sportmonks.com/images/soccer/players/21/25930741.png",
          position_id: 2,
          position: "Defender",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Sweden",
          birthdate: "13/05/2000",
          birthcountry: "Sweden",
          common_name: "E. Holm",
          weight: null,
          height: null,
        },
        {
          name: "Marc Dal Hende",
          image: "https://cdn.sportmonks.com/images/soccer/players/28/84092.png",
          position_id: 2,
          position: "Defender",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "06/11/1990",
          birthcountry: "Denmark",
          common_name: "M. Dal Hende",
          weight: "75 kg",
          height: "179 cm",
        },
        {
          name: "Philipp Schmiedl",
          image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          position_id: 2,
          position: "Defender",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Austria",
          birthdate: "23/06/1997",
          birthcountry: "Austria",
          common_name: "P. Schmiedl",
          weight: "89 kg",
          height: "187 cm",
        },
        {
          name: "Pierre Kanstrup",
          image: "https://cdn.sportmonks.com/images/soccer/players/28/83004.png",
          position_id: 2,
          position: "Defender",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "21/02/1989",
          birthcountry: "Denmark",
          common_name: "P. Kanstrup",
          weight: "81 kg",
          height: "186 cm",
        },
        {
          name: "Mads Winther",
          image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          position_id: 2,
          position: "Defender",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "20/10/2001",
          birthcountry: "Denmark",
          common_name: "M. Winther",
          weight: null,
          height: null,
        },
        {
          name: "Jeppe Friborg Simonsen",
          image: "https://cdn.sportmonks.com/images/soccer/players/10/84298.png",
          position_id: 4,
          position: "Attacker",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "21/11/1995",
          birthcountry: "Denmark",
          common_name: "J. Simonsen",
          weight: "76 kg",
          height: "184 cm",
        },
        {
          name: "Patrick Banggaard",
          image: "https://cdn.sportmonks.com/images/soccer/players/17/33745.png",
          position_id: 2,
          position: "Defender",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "04/04/1994",
          birthcountry: "Denmark",
          common_name: "P. Banggaard",
          weight: "84 kg",
          height: "196 cm",
        },
        {
          name: "Julius Eskesen",
          image: "https://cdn.sportmonks.com/images/soccer/players/9/1525033.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "16/03/1999",
          birthcountry: "Denmark",
          common_name: "J. Eskesen",
          weight: "68 kg",
          height: "175 cm",
        },
        {
          name: "Jannick Liburd",
          image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "26/09/2001",
          birthcountry: "Denmark",
          common_name: "J. Liburd",
          weight: null,
          height: null,
        },
        {
          name: "Adama Guira",
          image: "https://cdn.sportmonks.com/images/soccer/players/20/84052.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Burkina Faso",
          birthdate: "24/04/1988",
          birthcountry: "Burkina Faso",
          common_name: "A. Guira",
          weight: "75 kg",
          height: "179 cm",
        },
        {
          name: "Emil Frederiksen",
          image: "https://cdn.sportmonks.com/images/soccer/players/14/21404430.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "05/09/2000",
          birthcountry: "Denmark",
          common_name: "E. Frederiksen",
          weight: null,
          height: null,
        },
        {
          name: "Mads Hansen",
          image: "https://cdn.sportmonks.com/images/soccer/players/10/37315978.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "10/04/2001",
          birthcountry: "Denmark",
          common_name: "M. Hansen",
          weight: null,
          height: "174 cm",
        },
        {
          name: "Rasmus Hjorth Vinderslev",
          image: "https://cdn.sportmonks.com/images/soccer/players/30/84574.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "12/08/1997",
          birthcountry: "Denmark",
          common_name: "R. Vinderslev",
          weight: null,
          height: null,
        },
        {
          name: "Victor Sylvestre Mpindi Ekani",
          image: "https://cdn.sportmonks.com/images/soccer/players/22/4592182.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Cameroon",
          birthdate: "27/02/1997",
          birthcountry: "Cameroon",
          common_name: "V. Mpindi Ekani",
          weight: "82 kg",
          height: "190 cm",
        },
        {
          name: "Isak Jensen",
          image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "23/12/2003",
          birthcountry: "Denmark",
          common_name: "I. Jensen",
          weight: null,
          height: null,
        },
        {
          name: "Julius Beck",
          image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "27/04/2005",
          birthcountry: "Denmark",
          common_name: "J. Beck",
          weight: null,
          height: null,
        },
        {
          name: "Mads Winther Albæk",
          image: "https://cdn.sportmonks.com/images/soccer/players/13/83373.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "14/01/1990",
          birthcountry: "Denmark",
          common_name: "M. Winther Albæk",
          weight: "77 kg",
          height: "185 cm",
        },
        {
          name: "Anders K. Jacobsen",
          image: "https://cdn.sportmonks.com/images/soccer/players/11/83083.png",
          position_id: 4,
          position: "Attacker",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "27/10/1989",
          birthcountry: "Denmark",
          common_name: "A. Jacobsen",
          weight: "76 kg",
          height: "182 cm",
        },
        {
          name: "Bård Finne",
          image: "https://cdn.sportmonks.com/images/soccer/players/27/32315.png",
          position_id: 4,
          position: "Attacker",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Norway",
          birthdate: "13/02/1995",
          birthcountry: "Norway",
          common_name: "B. Finne",
          weight: "70 kg",
          height: "173 cm",
        },
        {
          name: "Roni Arabaci",
          image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          position_id: 4,
          position: "Attacker",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "14/02/2001",
          birthcountry: "Denmark",
          common_name: "R. Arabaci",
          weight: null,
          height: "176 cm",
        },
        {
          name: "Peter Christiansen",
          image: "https://cdn.sportmonks.com/images/soccer/players/15/21781711.png",
          position_id: 4,
          position: "Attacker",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Denmark",
          birthdate: "02/12/1999",
          birthcountry: "Denmark",
          common_name: "P. Christiansen",
          weight: null,
          height: null,
        },
        {
          name: "Haji Wright",
          image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          position_id: 4,
          position: "Attacker",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "USA",
          birthdate: "27/03/1998",
          birthcountry: "USA",
          common_name: "H. Wright",
          weight: "80 kg",
          height: "193 cm",
        },
        {
          name: "Rilwan Hassan",
          image: "https://cdn.sportmonks.com/images/soccer/players/4/83588.png",
          position_id: 3,
          position: "Midfielder",
          team_name: "SønderjyskE",
          team_id: 390,
          nationality: "Nigeria",
          birthdate: "09/02/1991",
          birthcountry: "Nigeria",
          common_name: "R. Hassan",
          weight: "64 kg",
          height: "172 cm",
        },
      ],
      latest: [
        {
          gameid: 1,
          GameDateTime: "2021-01-03 21:0:0",
          HomeTeam: "Midtjylland",
          AwayTeam: "SønderjyskE, ",
          Stadium: "MCH Arena",
          Result: "0-3",
          Referee: "Daiyrbek Abdyldayev",
          HomeTeamID: 939,
          AwayTeamID: 390,
          event_log: [
            {
              EventDate: "2021-01-03",
              EventTime: "19:10:00",
              EventGameTime: 10,
              EventDesc: "Goal Jesper Hansen",
            },
            {
              EventDate: "2021-01-03",
              EventTime: "19:44:00",
              EventGameTime: 44,
              EventDesc: "Goal Jesper Hansen",
            },
            {
              EventDate: "2021-01-03",
              EventTime: "20:50:00",
              EventGameTime: 91,
              EventDesc: "Goal Mikkel Anderson",
            },
          ],
        },
        {
          gameid: 2,
          GameDateTime: "2021-01-10 21:0:0",
          HomeTeam: "Midtjylland",
          AwayTeam: "SønderjyskE",
          Stadium: "MCH Arena",
          Result: "0-1",
          Referee: "Zainiddin Alimov",
          HomeTeamID: 939,
          AwayTeamID: 390,
          event_log: [
            {
              EventDate: "2021-01-03",
              EventTime: "19:10:00",
              EventGameTime: 10,
              EventDesc: "Goal Jesper Hansen",
            },
            {
              EventDate: "2021-01-03",
              EventTime: "19:44:00",
              EventGameTime: 44,
              EventDesc: "Goal Jesper Hansen",
            },
            {
              EventDate: "2021-01-03",
              EventTime: "20:50:00",
              EventGameTime: 91,
              EventDesc: "Goal Mikkel Anderson",
            },
          ],
        },
        {
          gameid: 6,
          GameDateTime: "2021-02-03 21:0:0",
          HomeTeam: "SønderjyskE",
          AwayTeam: "Randers",
          Stadium: "Sydbank Park",
          Result: "1-2",
          Referee: "Zainiddin Alimov",
          HomeTeamID: 390,
          AwayTeamID: 2356,
          event_log: [
            {
              EventDate: "2021-01-03",
              EventTime: "19:10:00",
              EventGameTime: 10,
              EventDesc: "Goal Jesper Hansen",
            },
            {
              EventDate: "2021-01-03",
              EventTime: "19:44:00",
              EventGameTime: 44,
              EventDesc: "Goal Jesper Hansen",
            },
            {
              EventDate: "2021-01-03",
              EventTime: "20:50:00",
              EventGameTime: 91,
              EventDesc: "Goal Mikkel Anderson",
            },
          ],
        },
      ],
      upcoming: [
        {
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
        {
          gameid: 10,
          GameDateTime: "2021-10-01 17:30:0",
          HomeTeam: "SønderjyskE",
          HomeTeamID: 390,
          AwayTeam: "Silkeborg",
          AwayTeamID: 86,
          Stadium: "Sydbank Park",
          Result: null,
          Referee: "Zainiddin Alimov",
        },
        {
          gameid: 12,
          GameDateTime: "2021-11-05 23:5:0",
          HomeTeam: "Randers",
          HomeTeamID: 2356,
          AwayTeam: "SønderjyskE",
          AwayTeamID: 390,
          Stadium: "Cepheus Park Randers ",
          Result: null,
          Referee: "Daiyrbek Abdyldayev",
        },
      ],
    }
    res.send(test);
  } catch (error) {
    error.status = 400;
    error.message = "Team id not found"
    next(error);
  }
});

router.get("/name/:teamname", async (req, res, next) => {
  try {
    const team_id = await teams_utils.getTeamIdByName(req.params.teamname)
    const team_details = await getTeamData(team_id)
    res.send(team_details);
  } catch (error) {
    error.status = 400;
    error.message = "Team name not found"
    next(error);
  }
});

router.get("/search/:teamname", async (req, res, next) => {
  try {
    const team_id = await teams_utils.getTeamIdByName(req.params.teamname)
    const team_details = await teams_utils.getPreviwTeamData(team_id)
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
