const router = require("express").Router();

const { getPlayers } = require("../controllers/getControllers");
const { postPlayers } = require("../controllers/postControllers");
const { updatePlayers } = require("../controllers/putControllers");
const { deletePlayers } = require("../controllers/deleteControllers");


router
  .get("/", getPlayers)
  .get("/:id", getPlayers)
  .post("/create", postPlayers)
  .put("/update/:id", updatePlayers)
  .delete("/delete/:id", deletePlayers);

module.exports = router;