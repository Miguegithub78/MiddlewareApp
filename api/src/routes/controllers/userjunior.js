const { Juniors,
    Languages,
    Technologies,
    Company,
    Publication,
    Admins } = require ('../../models/index');

require('dotenv').config();

const { SECRET } = process.env;

const jwt = require('jsonwebtoken');

const getAllJuniors = async (req, res) => {
    try{ 
        const allJuniors = await Juniors.find();
        res.json(allJuniors);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

const postJuniorsProfile = async (req, res) => {
    try{
        const { name, lastname, gmail, github, photograph, gender, phone, languages, technologies } = req.body;

        if(!name || gmail ? !gmail : !github) return res.status(404).json({message: "Faltan parametros"});

        const technologiesGet = await Technologies.find({name: technologies})
        const languagesGet = await Languages.find({name: languages})

        const juniorsCreate = await Juniors.create({
            name: name,
            lastname: lastname,
            gmail:gmail,
            github: github,
            photograph: photograph,
            gender: gender,
            phone: phone,
            languages: languagesGet,
            technologies: technologiesGet
        })

        const token = jwt.sign({id: juniorsCreate._id}, SECRET, {
            expiresIn: 60 * 60 * 24
        })
        
        res.json({auth: true, token: token, user: juniorsCreate})
    }catch(err){
        res.status(404).json({message: err.message})
    }
}


const getJuniorById = async (req, res) => {

    try{
        const { id } = req.params;
        const juniorsGet = await Juniors.findById(id)

        res.json(juniorsGet)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

const updateJuniorsProfile = async (req, res) => {

    try{

        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({auth: false, message: 'No token provided'})
        }

        const decoded = jwt.verify(token, SECRET);

        const user = await Juniors.findById(decoded.id)
        if(!user){
            return res.status(404).json({auth: false, message: 'usuario no registrado'})
        }

        const { id } = req.params;

        if(id !== decoded.id){
            return res.status(403).json({auth: false, message: 'usuario no autorizado'})
        } 
        const { name, lastname, gmail, github, photograph, gender, phone, languages, technologies } = req.body;

        const technologiesGet = await Technologies.find({name: technologies})
        const languagesGet = await Languages.find({name: languages})

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
            languages: languagesGet,
            technologies: technologiesGet
        }, {new: true})

        res.json(juniorsChange);
    } catch(error){
        res.status(404).json({message: error.message})
    }

}

const deleteJuniorsProfile = async (req, res) => {
    try{
        const { id } = req.params;
        const juniorsDelete = await Juniors.findByIdAndDelete(id)

        res.json(juniorsDelete)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}


module.exports = { getAllJuniors, postJuniorsProfile, getJuniorById, updateJuniorsProfile, deleteJuniorsProfile };
