const router = require("express").Router();

const { getProductRequest } = require("../controllers/getControllers");
const { postProductRequest} = require("../controllers/postControllers");
const { deleteProductRequest } = require("../controllers/deleteControllers");


router
  .get("/", getProductRequest)
  .get("/:id", getProductRequest)
  .post("/create", postProductRequest)
  .delete("/delete/:id", deleteProductRequest);

module.exports = router;