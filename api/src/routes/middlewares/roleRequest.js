const router = require("express").Router();

const { getRoleRequest } = require("../controllers/getControllers");
const { getRequestPlayer } = require("../controllers/getControllers");
const { getRestoreRoleRequest } = require("../controllers/restoreControllers");
const { postRoleRequest } = require("../controllers/postControllers");
const { updateRoleRequest } = require("../controllers/putControllers");
const { deleteRoleRequest } = require("../controllers/deleteControllers");

router
  .get("/", getRoleRequest)
  .get("/:id", getRoleRequest)
  .get("/player/:id", getRequestPlayer)
  .get("/restore/:id", getRestoreRoleRequest)
  .post("/create", postRoleRequest)
  .put("/update/:id", updateRoleRequest)
  .delete("/delete/:id", deleteRoleRequest)

module.exports = router;
