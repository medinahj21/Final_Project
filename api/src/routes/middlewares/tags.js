const { Router } = require("express");

const { getFilterTags } = require("../controllers/getControllers");
const { postFilterTag } = require("../controllers/postControllers");

const router = Router();

router.get("/", getFilterTags);
router.post("/create", postFilterTag);

module.exports = router;