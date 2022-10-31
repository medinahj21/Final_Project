const router = require("express").Router();

const { getOrder } = require("../controllers/getControllers");
const { getOrdersPlayer } = require("../controllers/getControllers");
const { postOrders } = require("../controllers/postControllers");
const { putOrders } = require("../controllers/putControllers");

router
  .get("/", getOrder)
  .get("/:id", getOrder)
  .get("/player/:id", getOrdersPlayer)
  .post("/create", postOrders)
  .put("/update/:id", putOrders);

module.exports = router;
