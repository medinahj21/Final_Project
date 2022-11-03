const router = require("express").Router();

const { getGroups } = require("../controllers/getControllers");
const { getRestoreGroup } = require("../controllers/restoreControllers");
const { postGroups } = require("../controllers/postControllers");
const { putGroups } = require("../controllers/putControllers");
const { deleteGroups } = require("../controllers/deleteControllers");

router
  .get("/", getGroups)
  .get("/:id", getGroups)
  .get("/restore/:id", getRestoreGroup)
  .post("/create", postGroups)
  .put("/update/:id", putGroups)
  .delete("/delete/:id", deleteGroups);

module.exports = router;
