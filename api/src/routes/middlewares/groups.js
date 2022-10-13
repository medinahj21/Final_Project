const { Router } = require("express");
const { createGroup } = require("../controllers/utils");
const router = Router();


router.get("/", (req, res) => {
    res.send("probando");
  })
  
router.post("/create", createGroup);

module.exports = router;
