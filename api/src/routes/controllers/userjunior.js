const {
  Juniors,
  Languages,
  Technologies,
  Company,
  Publication,
  Admins,
  SoftSkills,
} = require("../../models/index");

require("dotenv").config();

const { SECRET } = process.env;

const jwt = require("jsonwebtoken");

const getAllJuniors = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "se requiere token de autorización" });
    }
    const decoded = await jwt.verify(token, SECRET);

    let user = await Company.findOne({idFireBase: decoded.id});
    if(!user) user = await Juniors.findOne({idFireBase: decoded.id});
    if (!user) {
      return res
        .status(404)
        .json({ auth: false, message: "usuario no registrado" });
    }

    const allJuniors = await Juniors.find().populate([
      { path: "languages" },
      { path: "technologies" },
      { path: "softskills" },
      { path: "publications" },
      { path: "postulationsJobs" },
    ]);
    res.json(allJuniors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getJuniorById = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "se requiere token de autenticacion" });
    }

    const decoded = await jwt.verify(token, SECRET);
	 
    let user = await Juniors.findOne({idFireBase: decoded.id});
	  if(!user) user = await Company.findOne({idFireBase: decoded.id});
    if (!user) {
      return res
        .status(404)
        .json({ auth: false, message: "usuario no registrado" });
    }

    const { id } = req.params;
    const { firebase } = req.query;

    if(firebase === 'true'){

      const getJunior = await Juniors.findOne({idFireBase: id})
      .populate([{path: "languages"}, {path: "technologies"}, {path: "softskills"}, {path: "publications"}])
    
      res.json(getJunior)
      return
    }

    Juniors.findById(id)
      .populate("languages")
      .populate("technologies")
      .populate("softskills")
      .populate("publications")
      .populate("postulationsJobs")
      .exec((err, junior) => {
        if (err) {
          res.status(404).json({ message: err.message });
        } else {
          res.status(200).send(junior);
        }
      });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateJuniorsProfile = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "se requiere token" });
    }

    const decoded = await jwt.verify(token, SECRET);

    const user = await Juniors.findOne({idFireBase: decoded.id});
    if (!user) {
      return res
        .status(404)
        .json({ auth: false, message: "usuario no registrado" });
    }

    const { id } = req.params;

    if (id !== decoded.id) {
      return res
        .status(401)
        .json({ auth: false, message: "usuario no autorizado" });
    }
    const {
      name,
      gmail,
      github,
      photograph,
      phone,
      title,
      linkedin,
      city,
      description,
      languages,
      technologies,
      publications,
      softskills,
      website,
      jobsExperience,
      academicHistory,
      openToRelocate,
      openToRemote,
      openToFullTime,
    } = req.body;

    const juniorsChange = await Juniors.findOneAndUpdate(
      {
        idFireBase: id,
      },
      {
        name,
        gmail,
        github,
        photograph,
        website,
        title,
        phone,
        linkedin,
        city,
        description,
        languages,
        technologies,
        publications,
        softskills,
        jobsExperience,
        academicHistory,
        openToRelocate,
        openToRemote,
        openToFullTime,
      },
      { new: true }
    );

    res.json(juniorsChange);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteJuniorsProfile = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "se requiere token" });
    }

    const decoded = await jwt.verify(token, SECRET);

    const user = await Juniors.findOne({idFireBase: decoded.id});
    if (!user) {
      return res
        .status(404)
        .json({ auth: false, message: "usuario no registrado" });
    }

    const { id } = req.params;

    if (id !== decoded.id) {
      return res
        .status(401)
        .json({ auth: false, message: "usuario no autorizado" });
    }

    const getJunior = user;

    getJunior.publications.forEach(async (e) => {
      await Publication.findByIdAndDelete(e._id);
    });
    const juniorsDelete = await Juniors.findByIdAndDelete(id);

    res.json(getJunior);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllJuniors,
  getJuniorById,
  updateJuniorsProfile,
  deleteJuniorsProfile,
};