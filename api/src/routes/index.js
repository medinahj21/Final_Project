const { Router } = require('express');
const router = Router();

const home = require('./home')
router.use('/home', home)


module.exports = router;
