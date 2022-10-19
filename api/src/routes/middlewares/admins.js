const router = require("express").Router();

const { getAdmins } = require("../controllers/getControllers");
const { postAdmins } = require("../controllers/postControllers");
const { updateAdmins } = require("../controllers/putControllers");
// const { deleteAdmins } = require("../controllers/deleteControllers");

router
.get("/", getAdmins)
.get("/:id", getAdmins)
.post("/create", postAdmins)
.put("/update/:id", updateAdmins);
// .delete("/delete/:id", deleteAdmins);

module.exports = router;
