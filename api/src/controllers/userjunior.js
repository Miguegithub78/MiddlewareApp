const Junior = require ('../models/collections/juniors')

const getAllProgrammers = async (req, res) => {

    const allJuniors = await Junior.find();
    res.json(allJuniors);
}

const postProgrammerProfile = async (req, res) => {

   const juniorCreate = await Junior.create({
        
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    username: req.body.username,
    gmail: req.body.gmail,
    github: req.body.github,
    img: req.body.img,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    password: req.body.password,
   })
   res.json(juniorCreate);
}

const getProgrammerById = async (req, res) => {

    const { id } = req.params;
    const juniorsGet = await Junior.findById(id)

    res.json(juniorsGet)
}

module.exports = { getAllProgrammers, postProgrammerProfile, getProgrammerById };