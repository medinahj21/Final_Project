const { Router } = require("express");
const router = Router();
const products = require("../routes/middlewares/products");

const groups = require("./middlewares/groups");
const event = require("./middlewares/events");
router.use("/groups", groups);
router.use("/products", products);
router.use("/events", event);

//router.use("/admin", admin); //AndresV - ¿no entiendo bien por qué esta linea?

//router.use("/home", home);

module.exports = router;
