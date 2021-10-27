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

module.exports = { adminRegister };