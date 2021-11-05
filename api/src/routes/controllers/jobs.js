const { Juniors, Company, Jobs, Admins } = require ('../../models/index');

require('dotenv').config();

const { SECRET } = process.env;

const jwt = require('jsonwebtoken');

const postJobs = async (req, res) => {

    const { title, description, photograph, country, city, salary, currency, date, technologies, companyId, premium, status } = req.body;

      const company = await Company.findOne({ idMongo : companyId} );

        if(!title){
          
          return res.status(404).json({ error: 'required "Title" is missing'})
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
            company: company,
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

        const jobs = await Jobs.find().populate('company')
    
        res.json(jobs)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

const getJobsById = async (req, res) => {

    const { id } = req.params;

    try{

        const getJobs = await Jobs.findById(id)
        .populate('company')

        if(!getJobs) return res.status(404).json({message: "The job doesn't exists"})
    
        res.json(getJobs)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

const putJobs = async (req, res) => {
    
    const { id } = req.params;
  
      const { title, description, photograph, country, city, salary, currency, date, technologies, companyId, premium, status } = req.body;
  
        const company = await Company.findOne({ idMongo : companyId} );
  
          if(!title){
            
            return res.status(404).json({ error: 'required "Title" is missing'})
          }
  
          const newJob = {
              title,
              description,
              photograph,
              country,
              city,
              salary,
              currency,
              date,
              technologies,
              company: company,
              premium,
              status
          };
  
          try{
            const updatedJob = await Jobs.findByIdAndUpdate(id, newJob, {new: true})
  
            res.json(updatedJob)
          }
          catch(err){
            res.status(404).json({message: err.message})
          }
      }


const deleteJob = async (req, res) => {

  const { id } = req.params;

  try{

      const jobDeleted = await Jobs.findByIdAndDelete(id)
      res.json({message: "Job deleted"})

  }
  catch(err){
      res.status(404).json({message: err.message})
  }
}



module.exports = {
  postJobs,
  getAllJobs,
  getJobsById,
  deleteJob,
  putJobs
};


