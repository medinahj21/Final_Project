const router = require("express").Router();

const { getPlayers } = require("../controllers/getControllers");
const { getPlayerEvents } = require("../controllers/getControllers");
const { getRestorePlayer } = require("../controllers/restoreControllers");
const { postPlayers } = require("../controllers/postControllers");
const { updatePlayers } = require("../controllers/putControllers");
const { deletePlayers } = require("../controllers/deleteControllers");


router
  .get("/", getPlayers)
  .get("/:id", getPlayers)
  .get("/:id/events", getPlayerEvents)
  .get("/restore/:id", getRestorePlayer)
  .post("/create", postPlayers)
  .put("/update/:id", updatePlayers)
  .delete("/delete/:id", deletePlayers);

module.exports = router;