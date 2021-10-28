const { Juniors,
    Languages,
    Technologies,
    Company,
    Publication,
    Admins } = require ('../../models/index')

    require('dotenv').config();

    const { SECRET } = process.env;
    
    const jwt = require('jsonwebtoken');

const getAllJuniors = async (req, res) => {
    try{ 
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(403).json({auth: false, message: 'se requiere token de autorización'})
        }

        const decoded = jwt.verify(token, SECRET);

        const user = await Juniors.findById(decoded.id)
        if(!user){
            return res.status(404).json({auth: false, message: 'usuario no registrado'})
        }

        const allJuniors = await Juniors.find();
        res.json(allJuniors);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

const getJuniorById = async (req, res) => {

    try{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(403).json({auth: false, message: 'se requiere token de autenticacion'})
        }

        const decoded = jwt.verify(token, SECRET);

        const user = await Juniors.findById(decoded.id)
        if(!user){
            return res.status(404).json({auth: false, message: 'usuario no registrado'})
        }

        const { id } = req.params;
        const juniorsGet = await Juniors.findById(id)
        .populate('publications', 'description' )
        .then((p) => {
            
            res.json(p);
        });

    }catch(err){
        res.status(404).json({message: err.message})
    }
}

const updateJuniorsProfile = async (req, res) => {

    try{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(403).json({auth: false, message: 'se requiere token'})
        }

        const decoded = jwt.verify(token, SECRET);

        const user = await Juniors.findById(decoded.id)
        if(!user){
            return res.status(404).json({auth: false, message: 'usuario no registrado'})
        }

        const { id } = req.params;

        if(id !== decoded.id){
            return res.status(401).json({auth: false, message: 'usuario no autorizado'})
        } 

        const { name, lastname, gmail, github, photograph, gender, phone, languages, technologies } = req.body;


        if(languages || technologies){

            var getJunior = await Juniors.findById(id)

            var technologiesGet = await Technologies.find({name: technologies})
            var languagesGet = await Languages.find({name: languages})
        }

        const juniorsChange = await Juniors.findOneAndUpdate({
        _id: id
        },{
            name: name,
            lastname: lastname,
            gmail: gmail,
            github: github,
            photograph: photograph,
            gender: gender,
            phone: phone,
            languages: getJunior.languages.concat(languagesGet),
            technologies: getJunior.technologies.concat(technologiesGet)
        }, {new: true})

        res.json(juniorsChange);
    } catch(error){
        res.status(404).json({message: error.message})
    }

}

const deleteJuniorsProfile = async (req, res) => {
    try{

        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(403).json({auth: false, message: 'se requiere token'})
        }

        const decoded = jwt.verify(token, SECRET);

        const user = await Juniors.findById(decoded.id)
        if(!user){
            return res.status(404).json({auth: false, message: 'usuario no registrado'})
        }

        const { id } = req.params;

        if(id !== decoded.id){
            return res.status(401).json({auth: false, message: 'usuario no autorizado'})
        } 

        const getJunior = await Juniors.findById(id)

        getJunior.publications.forEach( async (e) => {

            await Publication.findByIdAndDelete(e._id)
        })
        const juniorsDelete = await Juniors.findByIdAndDelete(id)

        res.json(getJunior)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}


module.exports = { getAllJuniors, getJuniorById, updateJuniorsProfile, deleteJuniorsProfile };