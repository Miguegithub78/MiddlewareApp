const { Router } = require('express');

const router = Router()

const { getAllUsersType } = require('../controllers/userType')
const { getAllProgrammers } = require('../controllers/userjunior')

router.get('/', getAllUsersType);//path del landing
router.get('/programmers', getAllProgrammers);//se obtienen los usuarios programadores

module.exports = router;