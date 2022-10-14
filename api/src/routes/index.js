const { Router } = require("express");
const router = Router();
const products = require("../routes/middlewares/products");

const groups = require("./middlewares/groups");
// const admin = require("./middlewares/home");
const { prueba } = require("./controllers/utils");

router.use("/group", groups);
// router.use("/Admin", admin); //AndresV - ¿no entiendo bien por qué esta linea?
// router.use("/home", home);

router.use("/products", products);
//router.use("/groups", groups);

module.exports = router;
