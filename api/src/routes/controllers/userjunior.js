const { Juniors,
    Languages,
    Technologies,
    Company,
    Publication,
    Admins } = require ('../../models/index')

const getAllJuniors = async (req, res) => {

    const allJuniors = await Juniors.find();
    res.json(allJuniors);
}

const postJuniorsProfile = async (req, res) => {

    const { name, lastname, gmail, github, photograph, gender, phone, languages, technologies } = req.body;

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

    res.json(juniorsCreate)
}


const getJuniorById = async (req, res) => {

    const { id } = req.params;
    const juniorsGet = await Juniors.findById(id)

    res.json(juniorsGet)
}

const updateJuniorsProfile = async (req, res) => {
    
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

}

const deleteJuniorsProfile = async (req, res) => {

    const { id } = req.params;
    const juniorsDelete = await Juniors.findByIdAndDelete(id)

    res.json(juniorsDelete)
}


module.exports = { getAllJuniors, postJuniorsProfile, getJuniorById, updateJuniorsProfile, deleteJuniorsProfile };