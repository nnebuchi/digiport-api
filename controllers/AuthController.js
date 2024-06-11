const prompt = require('prompt-sync')();
const AuthService = require('../services/AuthService');
const authService = new AuthService();

class AuthController {
    async registerUser(req, res) {

        const requestBody = req.body
         // Extracting the email and password from the request body
        const email = requestBody.email;
        const password = requestBody.password;
        // Initializing an object to store potential errors
        const validation = await authService.validateUserRegData(email, password)
        if(validation){

             if(validation ==='success'){
                return authService.registerUser(email, password, res)
                // return res.status(200).end('yes')
             }else{ 
                return res.status(400).json(validation)
            }
        }else{
            // console.log(validation);
            return res.status(400).json(validation)
            // return res.status(400).json(validation)
        }
        
 
    }

    async loginUser(req, res) {

        const requestBody = req.body
         // Extracting the email and password from the request body
        const email = requestBody.email;
        const password = requestBody.password;
        const validation = await authService.validateUserLogin(email, password)
        if(validation){
             if(validation ==='success'){
                return authService.loginUser(email, password, res)
                // return res.status(200).end('yes')
             }else{ 
                return res.status(400).json(validation)
            }
        }else{
            // console.log(validation);
            return res.status(400).json(validation)
            // return res.status(400).json(validation)
        }

    }
    async forgotPassword(req, res) {

        const requestBody = req.body
         // Extracting the email and password from the request body
        const email = requestBody.email;
        
        return authService.forgotPassword(email, res)
    }

    async logoutUser(req, res){
        const requestBody = req.body
        return await authService.logoutUser(res)
    }
}


module.exports = AuthController;
