var express = require("express");
var path = express.Router();
var pathDb = require("../database/pathDb");
var jwt = require("jsonwebtoken");

path.get(
  "/getAllLocations",
  async function (req, res, next) {
    try {
      let result = await pathDb.getAllLocations();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.get(
  "/getAllreservations",
  async function (req, res, next) {
    try {
      let result = await pathDb.getAllreservations();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.get(
  "/getLocationById/:id",
  async function (req, res, next) {
    const locationId = req.params.id;
    try {
      let result = await pathDb.getLocationById(locationId);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.get(
  "/getReservationById/:id",
  async function (req, res, next) {
    const locationId = req.params.id;
    try {
      let result = await pathDb.getReservationById(locationId);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);


path.get(
  "/getPropertyId",
  async function (req, res, next) {
    const name = req.params.name;
    console.log("req.params.name"+ req.params.name);
    console.log("req.params"+ req.params);
    console.log("req"+ req);
    try {
      let result = await pathDb.getPropertyId(name);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.get(
  "/getUserLocationsById/:id",
  async function (req, res, next) {
    const locationId = req.params.id;
    try {
      let result = await pathDb.getUserLocationsById(locationId);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.post(
  "/register",
  async function (req, res, next) {
    try {
      console.log(req.body);

      let result = await pathDb.newUser(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.post(
  "/addProperty",
  async function (req, res, next) {
    try {
      console.log("disstream: ",req);

      let result = await pathDb.addProperty(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.post(
  "/book",
  async function (req, res, next) {
    try {
      console.log(req.body);

      let result = await pathDb.book(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);


path.post(
  "/login",
  async function (req, res, next) {
    try {
      let result = await pathDb.login(req.body);
      let id = result[0].user_id
      return res.status(200).json({sql: "00000", id});
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

path.post("/getJWT", async function (req, res, next) {
  let result = await pathDb.getLogin(req.body);
  try {
    let token = jwt.sign(
      {
        id: req.body.id,
        login: result[0],
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );
    let response = {
      message: "Autoryzacja przebiegła pomyślnie",
      token: token,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

path.post(
  "/getCurrentUser",
  async function (req, res, next) {
    try {
      let result = await pathDb.getCurrentUser(req.body.params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);


path.get("/message", (req, res) => {
  try {
    return res.status(200).json({ message: "Witaj" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});



module.exports = path;
