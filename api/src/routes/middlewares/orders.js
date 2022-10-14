const { Router } = require("express");

const { getOrder } = require("../controllers/getControllers");
const { postOrders } = require("../controllers/postControllers");
const { putOrders } = require("../controllers/putControllers");

const router = Router();

router.get("/", getOrder)
router.get("/:id", getOrder)
router.post("/create", postOrders);
router.put("/update/:id", putOrders); 

module.exports = router;
