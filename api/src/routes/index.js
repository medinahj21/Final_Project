const router = require("express").Router();

const group = require("./middlewares/groups");
const event = require("./middlewares/events");
const order = require("./middlewares/orders");
const player = require("./middlewares/players");
const admin = require("./middlewares/admins");
const tags = require("./middlewares/tags");
const product = require("./middlewares/products");
const rQuest = require("./middlewares/roleRequest");
const proQuest = require("./middlewares/productRequest");

router
  .use("/admins", admin)
  .use("/groups", group)
  .use("/events", event)
  .use("/orders", order)
  .use("/players", player)
  .use("/products", product)
  .use("/tags", tags)
  .use("/roleRequests", rQuest)
  .use("/productRequests", proQuest)

module.exports = router;
