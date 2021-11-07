const { Juniors, Company, Jobs } = require ('../../models/index');

const juniorsPostulations = async (req, res) => {
  const { id } = req.params; //id del job
  const { idMongo } = req.body //id del junior
  const junior = await Juniors.findOne({ idMongo : idMongo} );

  if(!idMongo){         
            return res.status(404).json({ error: 'required "Junior" is missing'})
          }

  const newPostulation = {
    junior: junior
  }

  try{
          const juniorPostulation = await Jobs.findByIdAndUpdate(id, newPostulation, {new: true})
  
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
