const { Juniors, Company, Jobs } = require ('../../models/index');

const juniorsPostulations = async (req, res) => {
  const { id } = req.params; //id del job
  const { idMongo } = req.body //id del junior
  
  try{
  const junior = await Juniors.findOne({ idMongo : idMongo } );
  
  if(!junior){         
            return res.status(404).json({ error: 'required "Junior" is missing'})
          }

  const allJobPostulation = Jobs.findById(id)

 
          const juniorPostulation = await Jobs.findByIdAndUpdate(id, {junior:allJobPostulation.junior.concat( junior.idMongo ) }, {new: true})
  
            res.json(juniorPostulation)
          }
          catch(err){
            res.status(404).json({message: err.message})
          }
}

module.exports = {

  juniorsPostulations
};


//llamar junior, jobsSchema
//query id job, junior id
//update job, {junior}
//concatenar id juniors en job

//postulationjob y concateno id de la puclicaion
//junior.postulationjob.push(id)
