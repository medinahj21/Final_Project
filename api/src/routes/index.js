const { Router } = require("express");
const router = Router();

const home = require("./middlewares/home");
const groups = require("./middlewares/groups");
const admin = require("./middlewares/home");
const { prueba} = require("./controllers/utils")

router.use("/group", groups);
router.use("/Admin", admin);
router.use("/home", home);

router.use("/", prueba);
//router.use("/groups", groups);

module.exports = router;
