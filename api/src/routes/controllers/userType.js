const { Juniors,
    Languages,
    Technologies,
    Company,
    Publication,
    Admins } = require ('../../models/index')

    require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;



const signIn = async (req, res) => {
    try{
        const { email, userType } = req.body;
        console.log(email, userType)
        if(userType === 'junior'){
            

            const user = await Juniors.findOne({gmail: email})
            if(!user){
                return res.status(404).json({auth: false, message: 'email no registrado'})
            }

            const token = jwt.sign({id: user._id}, SECRET, {
                expiresIn: 60 * 60 * 24
            })

            res.json({auth: true, token: token, user: user})
        }
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

module.exports = { signIn };