const UserService = require('../services/UserService');
const {runValidation} = require('../lib/buchi');


const userService = new UserService();


class UserController {
   async updateProfile(req, res){
    const requestBody = req.body;
    const {first_name, last_name, dob, gender} = requestBody;
    const data = {first_name, last_name, dob, gender};

    const validate = runValidation([
        {
            input:{value:first_name, field:"first_name", type:"text"},
            rules:{required:true}
        },
        {
            input:{value:last_name, field:"last_name", type:"text"},
            rules:{required:true}
        },
        {
            input:{value:dob, field:"dob", type:"text"},
            rules:{required:true}
        },
        {
            input:{value:gender, field:"gender", type:"text"},
            rules:{required:true}
        }
        
    ])
    if(validate?.status === false) {
        return res.status(409).json({
            status:"fail",
            errors:validate.errors,
            message:"Registration Failed",
        });
    }else{
    
        return await userService.updateProfile(data, res)
    }
    
   


   } 

   async socials(req, res){
    const requestBody = req.body;
    return await userService.socials(res)
   


   }

   async corporateProfile(req,res){
    const requestBody =req.body;
    return await userService.corporateProfile(res)
   }


    async insight(req, res){
        const requestBody = req.body
        return await userService.insight(res)
    }

    async skillSet(req, res){
        const requestBody = req.body
        return await userService.skillSet(res)
    }

    async project(req, res){
        const requestBody = req.body
        return await userService.project(res)
    }
    async education(req, res){
        const requestBody = req.body
        return await userService.education(res)
    }
    async certifications(req, res){
        const requestBody = req.body
        return await userService.certifications(res)
    }

   


}

module.exports = UserController;