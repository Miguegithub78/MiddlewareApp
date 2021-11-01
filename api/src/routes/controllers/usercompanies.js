const {
    Languages,
    Technologies,
    Company,
    Publication,
} = require ('../../models/index')

require('dotenv').config();

const { SECRET } = process.env;

const jwt = require('jsonwebtoken');

const getAllCompanies = async (req, res) => {
    try{
    const allCompanies = await Company.find();
    res.json(allCompanies);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getCompaniesById = async (req, res) => {
    try{
        const { id } = req.params;
        const companiesGet = await Company.findById(id)
            .populate('publications', 'description' )
            
        if(companiesGet) return res.json(companiesGet);
    
        res.status(404).json({message: "The company not exist"});

    }catch(err){
        res.status(404).json({message: err.message})
    }
}

const updateCompaniesProfile = async (req, res) => {
    
    try{
        const token = req.headers['x-auth-token'];
		if (!token) {
			return res
				.status(403)
				.json({ auth: false, message: 'se requiere token' });
		}

		const decoded = await jwt.verify(token, SECRET);

		const user = await Company.findById(decoded.id);
		if (!user) {
			return res
				.status(404)
				.json({ auth: false, message: 'usuario no registrado' });
		}

		const { id } = req.params;

		if (id !== decoded.id) {
			return res
				.status(401)
				.json({ auth: false, message: 'usuario no autorizado' });
		}

    const { name, webpage, gmail, description, photograph, country, state, languages, city } = req.body;

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
        description: description,
        languages: languagesGet,
    }, {new: true})

    res.json(CompaniesChange);
} catch(error){
    res.status(404).json({message: error.message})
}
}

const deleteCompaniesProfile = async (req, res) => {
    try{
        const token = req.headers['x-auth-token'];
		if (!token) {
			return res
				.status(403)
				.json({ auth: false, message: 'se requiere token' });
		}

		const decoded = await jwt.verify(token, SECRET);
        console.log(req.params.id, decoded)
		const user = await Company.findById(decoded.id);
		if (!user) {
			return res
				.status(404)
				.json({ auth: false, message: 'usuario no registrado' });
		}

		const { id } = req.params;

        

		if (id !== decoded.id) {
			return res
				.status(401)
				.json({ auth: false, message: 'usuario no autorizado' });
		}

        const getCompany = await Company.findById(id)
        
        getCompany.publications.forEach( async (e) => {

            await Publication.findByIdAndDelete(e._id)
        })

        const companyDelete = await Company.findByIdAndDelete(id)

        res.json(companyDelete)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}


module.exports = { getAllCompanies, getCompaniesById, updateCompaniesProfile, deleteCompaniesProfile };