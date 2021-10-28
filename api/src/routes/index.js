const { Router } = require('express');

const router = Router()

const { getAllUsersType } = require('./controllers/userType')
const { getAllJuniors, postJuniorsProfile, getJuniorById, updateJuniorsProfile, deleteJuniorsProfile } = require('./controllers/userjunior')
const {getAllCompanies, getCompaniesById, postCompaniesProfile, updateCompaniesProfile, deleteCompaniesProfile} = require('./controllers/usercompanies')
const { getAllLaguages, getAllTechnologies } = require('./controllers/abilities')
const { adminRegister } = require('./controllers/useradmin')

router.get('/', getAllUsersType);//path del landing(en revision)

router.get('/juniors', getAllJuniors);//se obtienen los usuarios programadores
router.get('/juniors/:id', getJuniorById); //se obtiene un usuario programador por id
router.post('/juniors', postJuniorsProfile);//se crea un usuario programador
router.put('/juniors/:id', updateJuniorsProfile);//se actualiza un usuario programador
router.delete('/juniors/:id', deleteJuniorsProfile);//se elimina un usuario programador

router.get('/companies', getAllCompanies);//se obtienen las empresas
router.get('/companies/:id', getCompaniesById); //se obtiene las empresas programador por id
router.post('/companies', postCompaniesProfile);//se crea un usuario empresa
router.put('/companies/:id', updateCompaniesProfile);//se actualiza una empresa
router.delete('/companies/:id', deleteCompaniesProfile);//se elimina un usuario empresa

router.get('/languages', getAllLaguages);//se obtienen los lenguajes
router.get('/technologies', getAllTechnologies);//se obtienen las tecnologias

router.post('/admin', adminRegister);   //se registran los administradores

router.post('/signup', postJuniorsProfile);//se crea un usuario


module.exports = router;