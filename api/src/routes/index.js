const { Router } = require("express");
const router = Router();
const products= require("../routes/middlewares/products")


const groups = require("./middlewares/groups");
const { prueba} = require("./controllers/utils")



router.use("/products", products);
//router.use("/groups", groups);

module.exports = router;
