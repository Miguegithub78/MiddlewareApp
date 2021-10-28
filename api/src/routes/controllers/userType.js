const {postJuniorsProfile} = require('./userjunior.js')
const {postCompaniesProfile} = require('./usercompanies')

const getAllUsersType = async (req, res) => {

    res.json({message: "Hello world LandingPage"})
}




module.exports = { getAllUsersType };

