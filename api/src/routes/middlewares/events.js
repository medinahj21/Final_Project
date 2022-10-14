const { Router } = require("express");
const { createEvent } = require("../controllers/postControllers");
const { deleteEvent } = require("../controllers/deleteControllers");
const { getEvent } = require("../controllers/getControllers");
const { editEvent } = require("../controllers/putControllers");

const router = Router();

router.post("/create", createEvent);
router.delete("/delete/:id", deleteEvent);
router.get("/event", getEvent);
router.get("/editEvent", editEvent);

module.exports = router;
