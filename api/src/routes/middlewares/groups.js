const { Router } = require("express");

const { getGroups } = require("../controllers/getControllers");
const { postGroups } = require("../controllers/postControllers");
const { putGroups } = require("../controllers/putControllers");
const { deleteGroups } = require("../controllers/deleteControllers");

const router = Router();

router.get("/", getGroups)
router.get("/:id", getGroups)
router.post("/create", postGroups);
router.put("/update/:id", putGroups);
router.delete("/delete/:id", deleteGroups);


module.exports = router;
