const pool = require("./pool");

let pathDb = [{}];

pathDb.getAllLocations = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM properties "+
      "INNER JOIN bathroom ON properties.property_id=bathroom.property_id " +
      "INNER JOIN entertainment ON properties.property_id=entertainment.property_id " +
      "INNER JOIN garden ON properties.property_id=garden.property_id " +
      "INNER JOIN kitchen ON properties.property_id=kitchen.property_id " +
      "INNER JOIN room ON properties.property_id=room.property_id " +
      "INNER JOIN technologies ON properties.property_id=technologies.property_id ",      
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

pathDb.getLocationById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM properties "+
    "INNER JOIN bathroom ON properties.property_id=bathroom.property_id " +
    "INNER JOIN entertainment ON properties.property_id=entertainment.property_id " +
    "INNER JOIN garden ON properties.property_id=garden.property_id " +
    "INNER JOIN kitchen ON properties.property_id=kitchen.property_id " +
    "INNER JOIN room ON properties.property_id=room.property_id " +
    "INNER JOIN technologies ON properties.property_id=technologies.property_id " +
    "WHERE properties.property_id = ?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

pathDb.getUserLocationsById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM properties "+
    "WHERE properties.owner_id = ?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

pathDb.getReservationById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM reservations "+
    "WHERE reservations.property_id = ?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

pathDb.getAllreservations = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM reservations",    
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

pathDb.newUser = (params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.beginTransaction(function (err) {
        if (err) {
          connection.rollback(function () {
            connection.release();
            return reject(err);
          });
        } else {
          connection.query(
            "INSERT INTO users (name, last_name, email, password) VALUES (?,?,?,?)",
            [
              params.firstName,
              params.lastName,
              params.email,
              params.password,
            ],
            function (err, result) {
              if (err) {
                connection.rollback(function () {
                  connection.release();
                  return reject(err);
                });
              } else {
                connection.commit(function (err) {
                  if (err) {
                    connection.rollback(function () {
                      connection.release();
                      return reject(err);
                    });
                  } else {
                    connection.release();
                    return resolve(result);
                  }
                });
              }
            }
          );
        }
      });
    });
  });
};

pathDb.book = (params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.beginTransaction(function (err) {
        if (err) {
          connection.rollback(function () {
            connection.release();
            return reject(err);
          });
        } else {
          connection.query(
            "INSERT INTO reservations (name, last_name, email, phone, res_start, res_end, property_id) VALUES (?,?,?,?,?,?,?)",
            [
              params.firstName,
              params.lastName,
              params.email,
              params.phone,
              params.startDate,
              params.endDate,
              params.prop_id,
            ],
            function (err, result) {
              if (err) {
                connection.rollback(function () {
                  connection.release();
                  return reject(err);
                });
              } else {
                connection.commit(function (err) {
                  if (err) {
                    connection.rollback(function () {
                      connection.release();
                      return reject(err);
                    });
                  } else {
                    connection.release();
                    return resolve(result);
                  }
                });
              }
            }
          );
        }
      });
    });
  });
};

pathDb.addProperty = (params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.beginTransaction(function (err) {
        if (err) {
          connection.rollback(function () {
            connection.release();
            return reject(err);
          });
        } else {
          connection.query(
            "INSERT INTO properties (owner_id, prop_name, price, beds, rooms, prop_country, prop_town, prop_zip, prop_street, description) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [
              params.owner_id,
              params.name,
              params.price,
              params.beds,
              params.rooms,
              params.country,
              params.town,
              params.zip,
              params.street,
              params.description,
            ],
            function (err, result) {
              if (err) {
                connection.rollback(function () {
                  connection.release();
                  return reject(err);
                });
              } else {
                connection.commit(function (err) {
                  if (err) {
                    connection.rollback(function () {
                      connection.release();
                      return reject(err);
                    });
                  } else {
                    connection.release();
                    return resolve(result);
                  }
                });
              }
            }
          );
        }
      });
    });
  });
};

pathDb.login = (params) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT user_id from users WHERE email = ? AND password = ?",
      [
        params.email,
        params.password,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};


pathDb.getLogin = (params) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT user_id FROM users WHERE user_id=?",
      params.id,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

pathDb.getPropertyId = (params) => {
  console.log("PARAMS = "+params);
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT property_id FROM properties WHERE prop_name=?",
      params.name,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

pathDb.getCurrentUser = (params) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT email FROM users WHERE user_id=?",
      params.id,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
      );
    });
  };

  module.exports = pathDb;