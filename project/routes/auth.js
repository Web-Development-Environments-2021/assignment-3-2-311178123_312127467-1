var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    const users = await DButils.execQuery(
      "SELECT username FROM Users"
    );

    if (users.length != 0 && users.find((x) => x.username === req.body.username))
      throw { status: 405, message: "Username taken" };

    //hash the password
    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    req.body.password = hash_password;

    // add the new username
    await DButils.execQuery(
      `INSERT INTO dbo.Users (username, password, firstname, lastname, country, email, imageurl) VALUES ('${req.body.username}', '${req.body.password}',
      '${req.body.firstname}','${req.body.lastname}','${req.body.country}','${req.body.email}','${req.body.imagurl}')`
    );
    res.status(201).send("user created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user =(
      await DButils.execQuery(
        `SELECT * FROM Users WHERE username = '${req.body.username}'`
      )
    )[0];
    // user = user[0];
    console.log(user);

    // check that username exists & the password is correct
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.userid = user.userid;

    // return cookie
    res.status(200).send("Login succeeded");
  } catch (error) {
    next(error);
  }
});

router.post("/logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});


router.get("/authenticateLeagueRep", async (req, res, next) => {
  try {
    const userid = req.session.userid;
    if (!userid)
      throw { status: 401, message: "Username not given" };

    const league_user = await DButils.execQuery(
      `SELECT * FROM LeagueRepsUsers WHERE userid = '${userid}'`
    )
  
    res.send(league_user.length > 0);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
