const { Router } = require('express');

const router = Router()

const { getAllUsersType } = require('./controllers/userType')
const { getAllJuniors, postJuniorsProfile, getJuniorById, updateJuniorsProfile, deleteJuniorsProfile } = require('./controllers/userjunior')

router.get('/', getAllUsersType);//path del landing
router.get('/juniors', getAllJuniors);//se obtienen los usuarios programadores
router.get('/juniors/:id', getJuniorById); //se obtiene un usuario programador por id
router.post('/juniors', postJuniorsProfile);//se crea un usuario programador
router.put('/juniors/:id', updateJuniorsProfile);//se actualiza un usuario programador
router.delete('/juniors/:id', deleteJuniorsProfile);//se elimina un usuario programador



module.exports = router;