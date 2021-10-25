const { Router } = require('express');

const router = Router()

const { getAllUsersType } = require('../controllers/userType')
const { getAllProgrammers, postProgrammerProfile, getProgrammerById } = require('../controllers/userjunior')

router.get('/', getAllUsersType);//path del landing
router.get('/programmers', getAllProgrammers);//se obtienen los usuarios programadores
router.post('/programmers', postProgrammerProfile);//se crea un usuario programador
router.get('/programmers/:id', getProgrammerById);

module.exports = router;