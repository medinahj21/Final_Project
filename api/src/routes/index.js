const router = require("express").Router();

const admin = require("./middlewares/admins");
const group = require("./middlewares/groups");
const event = require("./middlewares/events");
const order = require("./middlewares/orders");
const player = require("./middlewares/players");
const product = require("./middlewares/products");

router
    .use("/admins", admin)
    .use("/groups", group)
    .use("/events", event)
    .use("/orders", order)
    .use("/players", player)
    .use("/products", product)

module.exports = router;
