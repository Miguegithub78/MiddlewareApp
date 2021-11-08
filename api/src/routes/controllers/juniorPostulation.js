const { Juniors, Company, Jobs } = require('../../models/index');

const juniorsPostulations = async (req, res) => {
	const { id } = req.params; //id del job
	const { juniorId } = req.body; //id del junior

	try {
		const junior = await Juniors.findOne({ _id: juniorId });

		if (!junior) {
			return res.status(404).json({ error: 'required "Junior" is missing' });
		}

		const job = await Jobs.findOne({ _id: id });

		job.juniors = job.juniors.concat(juniorId);
		const savedJob = await job.save();

		junior.postulationsJobs = junior.postulationsJobs.concat(job._id);
		await junior.save();

		res.json(savedJob);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports = {
	juniorsPostulations,
};

//llamar junior, jobsSchema
//query id job, junior id
//update job, {junior}
//concatenar id juniors en job

//postulationjob y concateno id de la puclicaion
//junior.postulationjob.push(id)
