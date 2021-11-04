const { Juniors, Company } = require("../../models/index");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;
const createObect = (idUser, name, gmail, photograph, userType) => {
  const userObject = {
    _id: idUser,
    name,
    gmail,
    github,
    photograph: photograph || "https://www.w3schools.com/howto/img_avatar.png",
    phone: "",
    title: "",
    linkedin: "",
    city: "",
    description: "",
    languages: [],
    technologies: [],
    publications: [],
    softskills: [],
    website: "",
    jobsExperience: [],
    academicHistory: [],
    openToRelocate: false,
    openToRemote: false,
    openToFullTime: false,
    userType,
  };
  return userObject;
};

const signIn = async (req, res) => {
  //primera vez con email and pass
  if (req.body.emailAndPass) {
    const { gmail, userType } = req.body;
    if (userType === "juniors") {
      const user = await Juniors.findOne({ gmail });
      if (user) return res.json(user);
      return res.json({ noUser: true, gmail });
    }
    if (userType === "company") {
      const user = await Company.findOne({ gmail });
      if (user) return res.json(user);
      return res.json({ noUser: true, gmail });
    }
  }
  try {
    const { name, idUser, gmail, photograph, userType } = req.body;
    if (userType === "juniors") {
      const user = await Juniors.findOne({ gmail });
      if (!user) {
        // const userCreated = createObect(
        //   name,
        //   idUser,
        //   gmail,
        //   photograph,
        //   userType
        // );
        var juniorsCreate = await Juniors.create({
          _id: idUser,
          name,
          gmail,
          userType,
          photograph:
            photograph || "https://www.w3schools.com/howto/img_avatar.png",
        });
      }
      const token = jwt.sign({ id: idUser }, SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      return res.json({ auth: true, token: token, user: juniorsCreate });
      // const token = jwt.sign({ id: idUser }, SECRET, {
      //   expiresIn: 60 * 60 * 24,
      // });

      // return res.json({ auth: true, token: token, user: user });
    }

    if (userType === "company") {
      const user = await Company.findOne({ gmail: gmail });
      if (!user) {
        const userCreated = createObect(
          name,
          idUser,
          gmail,
          photograph,
          userType
        );
        var CompanyCreate = await Company.create(userCreated);
      }
      const token = jwt.sign({ id: idUser }, SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({ auth: true, token: token, user: CompanyCreate });
      return;

      // const token = await jwt.sign({ id: user._id }, SECRET, {
      //   expiresIn: 60 * 60 * 24,
      // });

      // res.json({ auth: true, token: token, user: user });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { signIn };
