const { Router } = require('express');

const router = Router()

const { getAllUsersType } = require('./controllers/userType')
const { getAllJuniors, postJuniorsProfile, getJuniorById, updateJuniorsProfile } = require('./controllers/userjunior')

router.get('/', getAllUsersType);//path del landing
router.get('/juniors', getAllJuniors);//se obtienen los usuarios programadores
router.get('/juniors/:id', getJuniorById);
router.post('/juniors', postJuniorsProfile);//se crea un usuario programador
router.put('/juniors/:id', updateJuniorsProfile);//se actualiza un usuario programador


module.exports = router;