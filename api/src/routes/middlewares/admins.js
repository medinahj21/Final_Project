const router = require("express").Router();

const { getAdmins } = require("../controllers/getControllers");
const { postAdmins } = require("../controllers/postControllers");
const { updateAdmins } = require("../controllers/putControllers");
const { deleteAdmin } = require("../controllers/deleteControllers");

router
  .get("/", getAdmins)
  .get("/:id", getAdmins)
  .post("/create", postAdmins)
  .put("/update/:id", updateAdmins)
  .delete("/delete/:id", deleteAdmin);

module.exports = router;
