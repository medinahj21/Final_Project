const router = require("express").Router();

const group = require("./middlewares/groups");
const event = require("./middlewares/events");
const order = require("./middlewares/orders");
const player = require("./middlewares/players");
const admin = require("./middlewares/admins");
const tags = require("./middlewares/tags");
const product = require("./middlewares/products");

<<<<<<< HEAD

router.use("/products", product);
router.use("/tags", tags);
router.use("/groups", group);
router.use("/events", event);
router.use("/orders", order);
router.use("/players", player);
router.use("/admins", admin);
=======
router
  .use("/admins", admin)
  .use("/groups", group)
  .use("/events", event)
  .use("/orders", order)
  .use("/players", player)
  .use("/products", product)
  .use("/tags", tags);
>>>>>>> d9ef980cd2a9f6fde9fd11863c89c61c99ff84d3

module.exports = router;
