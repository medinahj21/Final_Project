const router = require("express").Router();

const { getPlayers } = require("../controllers/getControllers");
const { postPlayers } = require("../controllers/postControllers");
const { updatePlayers } = require("../controllers/putControllers");
const { deletePlayers } = require("../controllers/deleteControllers");

<<<<<<< HEAD
router.get("/", getPlayers)
router.get("/:id", getPlayers)
router.post("/create", postPlayers);
// router.put("/update/:id", putPlayers);
// router.delete("/delete/:id", deletePlayers);
=======

router
  .get("/", getPlayers)
  .get("/:id", getPlayers)
  .post("/create", postPlayers)
  .put("/update/:id", updatePlayers)
  .delete("/delete/:id", deletePlayers);
>>>>>>> 8a64a0f5ca50c2b0b89c380456bc45de8489acd0

module.exports = router;
