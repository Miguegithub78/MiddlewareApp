const {
    Languages,
    Technologies,
    Company,
    Publication,
} = require ('../../models/index')

const getAllCompanies = async (req, res) => {
    try{
    const allCompanies = await Company.find();
    res.json(allCompanies);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const postCompaniesProfile = async (req, res) => {
    try{

    const { name, webpage, gmail, photograph, country, state, languages, city } = req.body;
    const languagesGet = await Languages.find({name: languages})

    const companyCreate = await Company.create({
        name: name,
        webpage: webpage,
        gmail:gmail,
        photograph: photograph,
        country: country,
        state: state,
        city: city,
        languages: languagesGet,
    })

    res.json(companyCreate)
}catch(err){
    res.status(404).json({message: err.message})
}
}


const getCompaniesById = async (req, res) => {
    try{
    const { id } = req.params;
    const companiesGet = await Company.findById(id)

    res.json(companiesGet)

}catch(err){
    res.status(404).json({message: err.message})
}
}

const updateCompaniesProfile = async (req, res) => {
    
    try{
    const { id } = req.params;
    const { name, webpage, gmail, photograph, country, state, languages, city } = req.body;

    const languagesGet = await Languages.find({name: languages})

    const CompaniesChange = await Company.findOneAndUpdate({
        _id: id
    },{
        name: name,
        webpage: webpage,
        gmail:gmail,
        photograph: photograph,
        country: country,
        state: state,
        city: city,
        languages: languagesGet,
    }, {new: true})

    res.json(CompaniesChange);
} catch(error){
    res.status(404).json({message: error.message})
}
}

const deleteCompaniesProfile = async (req, res) => {
    try{
    const { id } = req.params;
    const companyDelete = await Company.findByIdAndDelete(id)

    res.json(companyDelete)
}catch(err){
    res.status(404).json({message: err.message}) // eliminar info q el genero
}
}


module.exports = { getAllCompanies, postCompaniesProfile, getCompaniesById, updateCompaniesProfile, deleteCompaniesProfile };