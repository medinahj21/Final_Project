const { Router } =  require('express')
const {create} = require('../controllers/utils')
const router = Router()

router.post('/', create)


module.exports = router;