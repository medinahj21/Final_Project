const { Router } =  require('express')
const {create} = require('../controllers/utils')
const { asyncGetProducts }= require("../controllers/getControllers");
const {  asyncPostProduct }= require("../controllers/postControllers");
const router = Router();

router.get("/", asyncGetProducts)

router.post("/", asyncPostProduct)






module.exports = router;