<<<<<<< HEAD
const { Router } = require('express')
const { loadDb } = require('../controllers/utils')
const { asyncGetPlayers }= require("../controllers/getControllers");

=======
const { Router } =  require('express')
const {create} = require('../controllers/utils')
const router = Router()
>>>>>>> c6c62cb4111affede6d5fd2f07cef2b313847fcc

router.post('/', create)

<<<<<<< HEAD
router.get('/', asyncGetPlayers)
=======
>>>>>>> c6c62cb4111affede6d5fd2f07cef2b313847fcc

module.exports= router;