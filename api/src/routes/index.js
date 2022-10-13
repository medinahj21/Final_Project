const { Router } = require("express");
const router = Router();

const home = require("./middlewares/home");
const groups = require("./middlewares/groups");
const { prueba} = require("./controllers/utils")

router.use("/home", home);

router.use("/", prueba);
//router.use("/groups", groups);

module.exports = router;
