const { Router } = require('express')
const { loadDb } = require('../controllers/utils')
const { asyncGetPlayers }= require("../controllers/getControllers");


const router = Router();

router.get('/', asyncGetPlayers)

module.exports= router;