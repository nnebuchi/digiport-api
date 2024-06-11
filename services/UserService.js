const db = require('../utils/db');


class UserService{
    async updateProfile (data, res){
        // const {first_name, last_name, dob, gender} = data
        
        // const first_name = data?.first_name
        // const last_name = data?.last_name
        // const dob = data?.dob
        // const gender =data?.gender
        let updatedProfile =`UPDATE users SET first_name='[${data.first_name}]', last_name='[${data.last_name}]',date_of_birth='[${data.dob}]',gender ='[${data.gender}]' WHERE`;
        return res.status(400).json(
            {
                status:"fail",
                error:'user not found',
                message:"user not found"
            }
        )

        
        

    }

    async socials(res){
        return res.status(400).json(
            {
                status:"fail",
                error:'user not found',
                message:"user not found"

            }
        )

    }
    async corporateProfile(res){
        return res.status(400).json(
            {
                status:"fail",
                error:'items not found',
                message:"items not found"

            }
        )
        
    }

    async insight(res){
        return res.status(400).json(
            {
                status:"fail",
                error:'items not found',
                message:"items not found"

            }
        )
        
    }

    async skillSet(res){
        return res.status(400).json(
            {
                status:"fail",
                error:'items not found',
                message:"items not found"

            }
        )
        
    }

    async project(res){
        return res.status(400).json(
            {
                status:"fail",
                error:'items not found',
                message:"items not found"

            }
        )
        
    }

    async education(res){
        return res.status(400).json(
            {
                status:"fail",
                error:'items not found',
                message:"items not found"

            }
        )
        
    }

    async certifications(res){
        return res.status(400).json(
            {
                status:"fail",
                error:'items not found',
                message:"items not found"

            }
        )
        
    }



}

module.exports = UserService;