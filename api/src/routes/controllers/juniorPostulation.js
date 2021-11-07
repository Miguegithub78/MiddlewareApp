const { Juniors, Company, Jobs } = require ('../../models/index');

const juniorsPostulations = async (req, res) => {
  const { id } = req.params; //id del job
  const { idMongo } = req.body //id del junior

  try{

    // const junior = await Juniors.findOne({ idMongo : idMongo });

    // if(!junior){         
    //           return res.status(404).json({ error: 'required "Junior" is missing'})
    //         }

    const job = await Jobs.findOne({ _id : id });
    // const putJob = await Jobs.findByIdAndUpdate(id, {juniors: junior.idMongo});
    // res.json( putJob );

    job.juniors = job.juniors.concat(idMongo)
    const abc = await job.save()

    res.json(abc)

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
