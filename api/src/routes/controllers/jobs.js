const { Juniors, Company, Jobs, Admins } = require ('../../models/index');

require('dotenv').config();

const { SECRET } = process.env;

const jwt = require('jsonwebtoken');

const postJobs = async (req, res) => {

    const { title, description, photograph, country, city, salary, currency, date, technologies, companyId, premium, status } = req.body;

      const company = await Company.findOne({ idMongo : companyId} );

        if(!title){
          
          return res.status(404).json({ error: 'required "content" is missing'})
        }

        const newJob = new Jobs({
            title,
            description,
            photograph,
            country,
            city,
            salary,
            currency,
            date,
            technologies,
            company: company.idMongo,
            premium,
            status

        });

        try{
          const savedJob = await newJob.save();

          company.jobs = company.jobs.concat(savedJob._id);
          await company.save();

          res.json(savedJob);
        }
        catch(err){
          res.status(404).json({message: err.message})
        }
    }

const getAllJobs = async (req, res) => {

    try{

        const jobs = await Jobs.find();
    
        res.json(jobs)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}





























//             if(nameUser == 'company'){
//                 var company = idUser
//                 var getCompany = await Company.findOne({idMongo: idUser})
//             }
            
//             if(nameUser == 'junior'){
//                 var junior = idUser
//                 var getJunior = await Juniors.findOne({idMongo: idUser})
//             }

//             if(nameUser == 'admin'){
//                 var admin = idUser
//                 var getAdmin = await Admins.findOne({idMongo: idUser})
//             }

//             if(getCompany || getJunior || getAdmin){
                
//                 var postCreated = await Publication.create({
//                     description: description,
//                     photograph: photograph,
//                     company: getCompany,
//                     junior: getJunior,
//                     admin: getAdmin
//                 })
    
//                 if(company){
//                     await Company.findOneAndUpdate({idMongo: idUser},
//                     {
//                         publications: getCompany.publications.concat(postCreated._id)
//                     })
//                 }
        
//                 if(junior){
//                     await Juniors.findOneAndUpdate({idMongo: idUser},
//                     {
//                         publications: getJunior.publications.concat(postCreated._id)
//                     })
//                 }
        
//                 if(admin){
//                     await Admins.findOneAndUpdate({idMongo: idUser},
//                     {
//                         publications: getAdmin.publications.concat(postCreated._id)
//                     })
//                 }
//                 res.json(postCreated)
//             }
//             return
//         }
//         res.status(404).json({message: "Parametros incorrectos"})
//     }
//     catch(err){
//         res.status(404).json({message: err.message})
//     }

// }



// const getPublicationsById = async (req, res) => {

//     const { id } = req.params;

//     try{

//         const getPublication = await Publication.findById(id)
//             .populate([{ path: 'company'},{ path: 'junior'},{ path: 'admin'}])

//         if(!getPublication) return res.status(404).json({message: "La publicación no existe"})
    
//         res.json(getPublication)
//     }
//     catch(err){
//         res.status(404).json({message: err.message})
//     }
// }

// const putPublication = async (req, res) => {

//     const token = req.headers['x-auth-token'];
// 		if (!token) {
// 			return res
// 				.status(403)
// 				.json({ auth: false, message: 'Token is required' });
// 		}

// 		const decoded = await jwt.verify(token, SECRET);


//         const { idPublication, idProgramador } = req.query;

//         const getPublication = await Publication.findById(idPublication)
//         .populate([{ path: 'company'},{ path: 'junior'},{ path: 'admin'}])


//         if(getPublication.junior){
//             const user = await Juniors.findById(decoded.id);

//             if (!user) {
//                 return res
//                     .status(404)
//                     .json({ auth: false, message: 'user not found' });
//             }
//         }
        
// 		if ((getPublication.junior)&&(getPublication.junior._id !== decoded.id)) {  
//             return res
//             .status(401)
//             .json({ auth: false, message: 'unauthorizad user' });
// 		}

//         if(getPublication.company){
//             const user = await JuniorsCompany.findById(decoded.id);

//             if (!user) {
//                 return res
//                     .status(404)
//                     .json({ auth: false, message: 'user not found' });
//             }
//         }

//         if((getPublication.company)&&(getPublication.company._id !== decoded.id)) {
//             return res
// 				.status(401)
// 				.json({ auth: false, message: 'unauthorizad user' });
//         }

    
//     const { description, photograph } = req.body;

//     try{

//         if(getPublication.junior._id == idProgramador){

//             const updatePublicatio = await Publication.findByIdAndUpdate(idPublication, {
//                 description: description,
//                 photograph: photograph
//             }, {new: true})
    
//             res.json(updatePublicatio);
//         } else 
//         res.status(404).json({message: "La publicación no le pertenece al usuario"})


//     }
//     catch(err){
//         res.status(404).json({message: err.message});
//     }
// }



// const deletePublication = async (req, res) => {

//     const { id } = req.params;

//     try{

//         const postDeleted = await Publication.findByIdAndDelete(id)

//         res.json({message: "Publicación eliminada"})

//     }
//     catch(err){
//         res.status(404).json({message: err.message})
//     }
// }

module.exports = {
  postJobs,
  getAllJobs
};

