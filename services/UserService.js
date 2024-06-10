const db = require('../utils/db');


class UserService{
    async updateProfile (res){
        // const first_name = data?.first_name
        // const last_name = data?.last_name
        // const dob = data?.dob
        // const gender =data?.gender
        return res.status(400).json(
            {
                status:"fail",
                error:'user not found',
                message:"user not found"
            }
        )

        let updatedProfile =`UPDATE users SET first_name='[${first_name}]', last_name='[${last_name}]',date_of_birth='[${dob}]',gender ='[${gender}]'`;
        

    }

}

module.exports = UserService;