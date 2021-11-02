const { Juniors, Company, Publication, Admins } = require ('../../models/index');

require('dotenv').config();

const { SECRET } = process.env;

const jwt = require('jsonwebtoken');

const postPublications = async (req, res) => {

    const { nameUser, gmailUser } = req.query;
    const { description, photograph, country, dollar, tech, title } = req.body;

    try{
        
        if(!description) return res.status(404).json({message: "Falta la descripción"});
        if(!nameUser) return res.status(404).json({message: "No se le asigno un usuario a la publicación"});
        if(!gmailUser) return res.status(404).json({message: "No se le asigno un gmail a la publicación"});


        if(nameUser && gmailUser){

            if(nameUser == 'company'){
                var company = gmailUser
                var getCompany = await Company.findOne({gmail: gmailUser})
            }
            
            if(nameUser == 'junior'){
                var junior = gmailUser
                var getJunior = await Juniors.findOne({gmail: gmailUser})
            }

            if(nameUser == 'admin'){
                var admin = gmailUser
                var getAdmin = await Admins.findOne({gmail: gmailUser})
            }

            if(getCompany || getJunior || getAdmin){
                
                var postCreated = await Publication.create({
                    description: description,
                    photograph: photograph,
                    country: country,
                    dollar: dollar,
                    tech: tech,
                    title: title,
                    company: getCompany,
                    junior: getJunior,
                    admin: getAdmin
                })
    
                if(company){
                    await Company.findByIdAndUpdate(getCompany._id,
                    {
                        publications:   getCompany.publications.concat(postCreated._id)
                    })
                }
        
                if(junior){
                    await Juniors.findByIdAndUpdate(getJunior._id,
                    {
                        publications:   getJunior.publications.concat(postCreated._id)
                    })
                }
        
                if(admin){
                    await Admins.findByIdAndUpdate(getAdmin._id,
                    {
                        publications:   getAdmin.publications.concat(postCreated._id)
                    })
                }
                res.json(postCreated)
            }
        }
        res.status(404).json({message: "Parametros incorrectos"})
    }
    catch(err){
        res.status(404).json({message: err.message})
    }

}

const getPublications = async (req, res) => {

    try{

        const publications = await Publication.find()
            .populate([{ path: 'company'},{ path: 'junior'},{ path: 'admin'}])
    
        res.json(publications)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

const getPublicationsById = async (req, res) => {

    const { id } = req.params;

    try{

        const getPublication = await Publication.findById(id)
            .populate([{ path: 'company'},{ path: 'junior'},{ path: 'admin'}])
    
        res.json(getPublication)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

const putPublication = async (req, res) => {

    const token = req.headers['x-auth-token'];
		if (!token) {
			return res
				.status(403)
				.json({ auth: false, message: 'Token is required' });
		}

		const decoded = await jwt.verify(token, SECRET);


        const { id } = req.params;

        const getPublication = await Publication.findById(id)
        .populate([{ path: 'company'},{ path: 'junior'},{ path: 'admin'}])


        if(getPublication.junior){
            const user = await Juniors.findById(decoded.id);

            if (!user) {
                return res
                    .status(404)
                    .json({ auth: false, message: 'user not found' });
            }
        }

        if(getPublication.company){
            const user = await JuniorsCompany.findById(decoded.id);

            if (!user) {
                return res
                    .status(404)
                    .json({ auth: false, message: 'user not found' });
            }
        }

		if ((getPublication.junior)&&(getPublication.junior._id !== decoded.id)) {
			return res
				.status(401)
				.json({ auth: false, message: 'unauthorizad user' });
		}

        if((getPublication.company)&&(getPublication.company._id !== decoded.id)) {
            return res
				.status(401)
				.json({ auth: false, message: 'unauthorizad user' });
        }

    
    const { description, photograph } = req.body;

    try{

        const updatePublicatio = await Publication.findByIdAndUpdate(id, {
            description: description,
            photograph: photograph
        }, {new: true})

        res.json(updatePublicatio);

    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}



//ESTE DELETE ESTA EN PRUEBAS
// const deletePublication = async (req, res) => {

//     const { id } = req.params;

//     try{

        // const postDeleted = await Publication.findByIdAndDelete(id)

//         var getCompanyId = await Company.findById('617a259bcbb517b0890a0c8e')
//         const getCompany = await Company.findByIdAndUpdate('617a259bcbb517b0890a0c8e', {
//             publications: getCompanyId.publications.filter(e => e !== id)
            // {
            //     if(e !== '617a2c04708014378b696eb2') return e
            // })
//         }, {new: true})

        // getCompany.publications = getCompany.publications.filter(e => e._id !== '617a2c04708014378b696eb2')
        // getCompany.save()

//         res.json(getCompany)

//     }
//     catch(err){
//         res.status(404).json({message: err.message})
//     }
// }

module.exports = {
    postPublications,
    getPublications,
    getPublicationsById,
    putPublication
    // deletePublication
}