const {
    Languages,
    Technologies,
    States,
} = require ('../../models/index')

const getAllLaguages = async (req, res) => {
    try{
    const allLanguages = await Languages.find();
    res.json(allLanguages);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getAllTechnologies = async (req, res) => {
    try{
    const allTechnologies = await Technologies.find();
    res.json(allTechnologies);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getUbication = async (req, res) => {
    
    const allLanguages = await States.find();
    res.json(allLanguages);
    // try{
    //     const {country, States } = req.body;
    //     console.log(country);
    // const ubication = await States.findAll({name_country: country});
    // res.json(ubication);

    // } catch (error) {
    //     res.status(404).json({ error: error.message });
    // }
}

module.exports = { getAllLaguages, getAllTechnologies, getUbication }