const { Router } = require("express");

const router = Router();

const product = require("./middlewares/products");
const group = require("./middlewares/groups");
const event = require("./middlewares/events");
const order = require("./middlewares/orders");
const player = require("./middlewares/players");
const admin = require("./middlewares/admins");
const tags = require("./middlewares/tags");


router.use("/products", product);
router.use("/tags", tags);
router.use("/groups", group);
router.use("/events", event);
router.use("/orders", order);
router.use("/players", player);
router.use("/admins", admin);

module.exports = router;
