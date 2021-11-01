const { Company, Jobs, Admins } = require ('../../models/index');
const { deleteJuniorsProfile } = require('./userjunior');

const jobPost = async (req, res) => {

    const { id } = req.query;
    const { photograph, title, description, country, city, dollar, salary, tech, languages, date, premium, company, admin } = req.body;

    try{
        
        if(!description) return res.status(404).json({message: "We need a job description"});
        if(!id) return res.status(404).json({message: "We have not id user"});
        if(!photograph) return res.status(404).json({message: "We need a photograph"});

        if(id && photograph && description){

                var getCompany = await Company.findOne({id:_id})
                var getAdmin = await Admins.findOne({id:_id})

            if(getCompany || getAdmin){
                
                var postCreated = await Jobs.create({
                    photograph: photograph,
                    title: title,
                    description: description,
                    country: country,
                    city: city,
                    dollar: dollar,
                    salary: salary,
                    tech: tech,
                    languages: languages,
                    date: date,
                    company: getCompany,
                    admin: getAdmin,
                    premium: premium
                })

                if(admin){
                    await Admins.findByIdAndUpdate(getAdmin._id,
                    {
                        jobs: getAdmin.jobs.concat(postCreated._id)
                    })
                }
                res.json(postCreated)

                if(company){
                    await Company.findByIdAndUpdate(getCompany._id,
                    {
                        jobs: getCompany.jobs.concat(postCreated._id)
                    })
                }
                res.json(postCreated)
            }
        }
        res.status(404).json({message: err.message})
    }
    catch(err){
        res.status(404).json({message: err.message})
    }

}

// const getPublications = async (req, res) => {

//     try{

//         const publications = await Publication.find()
//             .populate([{ path: 'company'},{ path: 'junior'},{ path: 'admin'}])
    
//         res.json(publications)
//     }
//     catch(err){
//         res.status(404).json({message: err.message})
//     }
// }

const getJobById = async (req, res) => {

    const { id } = req.params;

    try{

        const getJob = await Jobs.findById(id)
            .populate([{ path: 'company'},{ path: 'admins'}])
    
        res.json(getJob)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

// const updateJob = async (req, res) => {

//     const { id } = req.params;
//     const { photograph, title, description, country, city, dollar, salary, tech, languages, date, premium, company, admin } = req.body;

//     try{

//         const updateJob = await Jobs.findByIdAndUpdate(id, {
//             description: description,
//             photograph: photograph
//         }, {new: true})

//         res.json(updateJob);

//     }
//     catch(err){
//         res.status(404).json({message: err.message});
//     }
// }



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
    jobPost,
    getJobById,
    
}