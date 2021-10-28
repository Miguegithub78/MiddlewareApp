const { Juniors,
    Languages,
    Technologies,
    Company,
    Publication,
    Admins } = require ('../../models/index')

const adminRegister = async (req, res) => {
    try{
        const { name, lastname, gmail, github, photograph } = req.body;

        const adminCreate = await Admins.create({
            name: name,
            lastname: lastname,
            gmail:gmail,
            github: github,
            photograph: photograph,
        })
        
        res.json(adminCreate)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

const getAdmins = async (req, res) => {

    const { id } = req.query;

    try{

        if(id){
            const admin = await Admins.findById(id)
                .populate('publications', 'description')
                .then(e => {
                    return res.json(e)
                })
                return
        }
    
        const admins = await Admins.find();
    
        res.json(admins)    
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

module.exports = { adminRegister, getAdmins };