
const { Juniors, Company, Jobs } = require ('../../models/index');
const nodemailer = require('nodemailer'); // previamente hay que instalar nodemailer

const juniorsPostulations = async (req, res) => {
	const { id } = req.params; //id del job
	const { juniorId } = req.body; //id del junior

	try {
		const junior = await Juniors.findOne({ _id: juniorId });
    const companyData = await Jobs.findOne({_id: id}).populate({path: 'company'})
    const gmailCompany = companyData.company.gmail

		if (!junior) {
			return res.status(404).json({ error: 'required "Junior" is missing' });
		}

		const job = await Jobs.findOne({ _id: id });

		job.juniors = job.juniors.concat(juniorId);
		const savedJob = await job.save();

		junior.postulationsJobs = junior.postulationsJobs.concat(job._id);
		await junior.save();

            const transporter = nodemailer.createTransport({  //acá voy a crear los datos del correo del que envía
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'avalleapi42@gmail.com',
                    pass: 'pueybbhuxrqugxxr'
                } 
            });

            await transporter.sendMail({ // acá los datos de a quien se le envía y qué se le envía, se puede mandar template html también incluso atachment o imágenes y documentos
                from: '"Middleware App 👻" <avalleapi42@gmail.com>', // sender address
                to: `${ gmailCompany }`, // list of receivers
                subject: "Tienes un nuevo postulante", // Subject line
                html: `<b> El usuario ${junior.name} se ha postulado en tu propuesta. Felicitaciones!!! </b>`
                // `<b>Verificar usuario</b>
                //         <a href= "http://localhost:3001/admit/${user.gmail}">Middleware App</a>`
              });

              await transporter.sendMail({ // acá los datos de a quien se le envía y qué se le envía, se puede mandar template html también incluso atachment o imágenes y documentos
                from: '"Middleware App 👻" <avalleapi42@gmail.com>', // sender address
                to: `${ junior.gmail }`, // list of receivers
                subject: "Te postulaste en Middleware", // Subject line
                html: `<b> Felicitaciones ${junior.name} ya te encuentras postulado a la publicación de ${companyData.title}. Felicitaciones!!! </b>`
                // `<b>Verificar usuario</b>
                //         <a href= "http://localhost:3001/admit/${user.gmail}">Middleware App</a>`
              });
    
    res.json(savedJob)

  }
  catch(err){
    res.status(404).json({message: err.message})
  }
}

module.exports = {
	juniorsPostulations,
};

