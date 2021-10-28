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
        const { name, lastname, gmail, github, photograph, gender, phone, description, languages, technologies } = req.body;

        const technologiesGet = await Technologies.find({name: technologies})
        const languagesGet = await Languages.find({name: languages})

        const juniorsCreate = await Juniors.create({
            name: name,
            lastname: lastname,
            gmail:gmail,
            github: github,
            photograph: photograph || 'https://www.w3schools.com/howto/img_avatar.png',
            gender: gender,
            phone: phone,
            description: description,
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
        const { id } = req.params;
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
        const { id } = req.params;
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


module.exports = { getAllJuniors, postJuniorsProfile, getJuniorById, updateJuniorsProfile, deleteJuniorsProfile };