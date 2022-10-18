const router = require("express").Router();

const { getGroups } = require("../controllers/getControllers");
const { postGroups } = require("../controllers/postControllers");
const { putGroups } = require("../controllers/putControllers");
const { deleteGroups } = require("../controllers/deleteControllers");

<<<<<<< HEAD
const router = Router();

router.get("/", getGroups);
router.get("/:id", getGroups);
router.post("/create", postGroups);
router.put("/update/:id", putGroups);
router.delete("/delete/:id", deleteGroups);
=======
router
  .get("/", getGroups)
  .get("/:id", getGroups)
  .post("/create", postGroups)
  .put("/update/:id", putGroups)
  .delete("/delete/:id", deleteGroups);
>>>>>>> d9ef980cd2a9f6fde9fd11863c89c61c99ff84d3

module.exports = router;
