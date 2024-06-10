const UserService = require('../services/UserService');

const userService = new UserService();


class UserController {
   async updateProfile(req, res){
    const requestBody = req.body
    return await userService.updateProfile(res)
   


   } 
}

module.exports = UserController;