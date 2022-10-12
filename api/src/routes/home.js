const { Router } = require('express');
const { loadDb } = require('../controllers/utils')

const router = Router();

router.get('/', async (req, res) =>{
    res.send('home')
});

module.exports = router;