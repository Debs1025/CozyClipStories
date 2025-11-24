const serverless = require("serverless-http");
const { app, connectFirebase } = require("../server");

connectFirebase()
  .then((db) => {
    if (db) app.locals.db = db;
  })
  .catch((err) => {
    console.warn("connectFirebase failed in serverless wrapper:", err && err.message ? err.message : err);
  });

module.exports = serverless(app);