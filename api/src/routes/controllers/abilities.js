const {
    Languages,
    Technologies,
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

module.exports = { getAllLaguages, getAllTechnologies }