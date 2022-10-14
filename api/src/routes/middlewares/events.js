const { Router } = require("express");

const { createEvent } = require("../controllers/postControllers");
const { deleteEvent } = require("../controllers/deleteControllers");
const { getEvent } = require("../controllers/getControllers");
const { editEvent } = require("../controllers/putControllers");

const router = Router();

router.get("/", getEvent);
router.get("/:id", getEvent);
router.post("/create", createEvent);
router.put("/update/:id", editEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;
