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

    const { name, idUser, gmail, photograph, userType } = req.body;

    try{
        
        if(userType === 'junior'){
            

            const user = await Juniors.findOne({gmail: gmail})
            if(!user){
                
                const juniorsCreate = await Juniors.create({
                    _id: idUser,
                    name: name,
                    gmail:gmail,
                    photograph: photograph || 'https://www.w3schools.com/howto/img_avatar.png',
                })

                const token = jwt.sign({id: juniorsCreate._id}, SECRET, {
                    expiresIn: 60 * 60 * 24
                })
                
                res.json({auth: true, token: token, user: juniorsCreate});
                return
            }

            const token = jwt.sign({id: idUser}, SECRET, {
                expiresIn: 60 * 60 * 24
            })

            res.json({auth: true, token: token, user: user})
        }

        if(userType === 'company'){
            

            const user = await Company.findOne({gmail: gmail})
            if(!user){
                
                const CompanyCreate = await Company.create({
                    _id: idUser,
                    name: name,
                    gmail:gmail,
                    photograph: photograph || 'https://www.w3schools.com/howto/img_avatar.png',
                })

                const token = jwt.sign({id: CompanyCreate._id}, SECRET, {
                    expiresIn: 60 * 60 * 24
                })
                
                res.json({auth: true, token: token, user: CompanyCreate});
                return
            }

            const token = jwt.sign({id: idUser}, SECRET, {
                expiresIn: 60 * 60 * 24
            })

            res.json({auth: true, token: token, user: user})
        }
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

module.exports = { signIn };