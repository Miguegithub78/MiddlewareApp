const { Juniors,
    Languages,
    Technologies,
    Company,
    Publication,
    Admins } = require ('../../models/index')

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

        const technologiesGet = await Technologies.find({name: technologies})
        const languagesGet = await Languages.find({name: languages})

        const juniorsCreate = await Junior.create({
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
        
        res.json(juniorsCreate)
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
        const { id } = req.params;
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
