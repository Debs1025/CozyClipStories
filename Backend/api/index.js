const serverless = require("serverless-http");
const { app, connectFirebase } = require("../server");

const handler = serverless(app);
let initPromise = null;
let initialized = false;

async function ensureInit() {
  if (initialized) return;
  if (!initPromise) {
    initPromise = connectFirebase()
      .then((db) => {
        if (db) app.locals.db = db;
        initialized = true;
      })
      .catch((err) => {
        console.warn("connectFirebase failed in serverless wrapper:", err && err.message ? err.message : err);
      });
  }
  return initPromise;
}

module.exports = async (req, res) => {
  await ensureInit();
  return handler(req, res);
};