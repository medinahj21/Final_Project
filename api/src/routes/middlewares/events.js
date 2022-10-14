const { Router } = require("express");
const { createEvent } = require("../controllers/postControllers");
const { deleteEvent } = require("../controllers/deleteControllers");
const { getEvent } = require("../controllers/getControllers");
const { editEvent } = require("../controllers/putControllers");

const router = Router();

router.post("/create", createEvent);
router.delete("/delete/:id", deleteEvent);
router.put("/update/:id", editEvent);
router.get("/", getEvent);
router.get("/:id", getEvent);

module.exports = router;
