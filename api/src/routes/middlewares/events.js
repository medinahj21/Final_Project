const router = require("express").Router();

const { getEvent } = require("../controllers/getControllers");
const { getPlayerEvents } = require("../controllers/getControllers");
const { getRestoreEvent } = require("../controllers/restoreControllers");
const { createEvent } = require("../controllers/postControllers");
const { editEvent } = require("../controllers/putControllers");
const { deleteEvent } = require("../controllers/deleteControllers");

router
  .get("/", getEvent)
  .get("/:id", getEvent)
  .get("/player/:id", getPlayerEvents)
  .get("/restore/:id", getRestoreEvent)
  .post("/create", createEvent)
  .put("/update/:id", editEvent)
  .delete("/delete/:id", deleteEvent)
  
module.exports = router;
