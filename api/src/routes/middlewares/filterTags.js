const { Router } = require("express");


const {getFilteredProducts}= require("../controllers/getControllers");


const router= Router();

router.get("/filtered", getFilteredProducts)

module.exports = router;