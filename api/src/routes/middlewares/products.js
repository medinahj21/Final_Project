const { Router } = require('express')
const { create } = require('../controllers/utils')
const { asyncGetProducts } = require("../controllers/getControllers");
const { asyncPostProduct } = require("../controllers/postControllers");
const { asyncDeleteProduct } = require("../controllers/deleteControllers");
const { asyncUpdateProduct } = require("../controllers/putControllers");
const { asyncGetProductById }= require("../controllers/getControllers");
const router = Router();

router.get("/", asyncGetProducts)

router.get("/:id", asyncGetProductById)

router.post("/", asyncPostProduct)

router.delete('/', asyncDeleteProduct)

router.put('/', asyncUpdateProduct)






module.exports = router;