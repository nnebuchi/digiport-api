const db = require('../utils/db');
const {generateOTP, sendOtpEmail} = require('../utils/generic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey= process.env.AUTH_SECRET_KEY;

class AuthService{
    
    
    async validateUserRegData (email, password){
        
        const errors={};

        // Regular expression to check for a number and alphabet
        const number = /[0-9]/g;
        const alphabet = /[A-Za-z]/;

        
        if(email == "undefined" || email?.length === 0){
            if(!errors.email){
                errors.email  = []
            }
            errors.email.push("email required")
          
        }
        if (password == "undefined" || password?.length === 0) {
            if (!errors.password) {
                errors.password = [];
            }
            errors.password.push("password required");
        }
        
        // check if password contain a number
        if(!number.test(password)){
              // Initialize errors.password array if not already initialized
            if(!errors.password){
                errors.password  = []
            }
            errors.password.push("Password must contain a number")
        }

         // check if password contain an alphabet 
        if (!alphabet.test(password)){
            if(!errors.password){
                errors.password  = []
            }
            errors.password.push("password must contain an alphabet")
        }
         // Check if the password length is greater than 8 characters
        if (password?.length <= 8) {
            if(!errors.password){
                errors.password  = []
            }
            errors.password.push("Password must be more than 8 characters.");
        }
       
        
        // SQL query to check if the email already exists in the database
        let existingEmailQuery = `SELECT * FROM users WHERE email = '${email}'`;
        
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(existingEmailQuery, (error, results) => {
                    if (error) {
                        reject(new Error('Database query failed to check existing email.'));
                    } else {
                        resolve(results);
                    }
                });
            });
    
            // Check if the email already exists in the database
            if (results && results.length > 0) {
                // Initialize errors.email array if not already initialized
                if (!errors.email) {
                    errors.email = []
                }
                // Add a specific error message if the email is already taken
                errors.email.push("Email already taken.")
            }
    
            if (Object.keys(errors).length > 0) {
                const response = {
                    status: "fail",
                    errors: errors,
                    message: "user registration failed"
                };
                return response;
            } else {
                return 'success';
            }
        } catch (error) {
            const response = {
                status: "fail",
                errors: 'Database query failed to check existing email.\n'+error,
                message: "user registration failed"
            };
            return response;
        }
    }

    async registerUser(email , password, res){
        const hashedPassword = await bcrypt.hash(password, 10);
        let sql= `INSERT INTO users( email, password) VALUES ('${email}', '${hashedPassword}')`;
        db.query( sql, function(error, outcome)  {
            if (error) {
                return res.status(400).json(
                    {
                        status:"fail",
                        error:'Database query failed.\n'+error,
                        message:"user registration failed"
                    }
                )
            }
            if (outcome) {
            // If the user is successfully registered, respond with a 200 status
                return res.status(201).json(
                    {
                        status:"success",
                        message:"'registered successful.'"
                    }
                )
            } else {
            // If an unknown error occurs, respond with a 400 status
            
                return res.status(400).json(
                    {
                        status:"fail",
                        error:'unknown error',
                        message:"user registration failed"
                    }
                )
            }
        });
    }

    async validateUserLogin(email, password) {
       
        // const hashedPassword = bcrypt.compare(password)
        const errors = [];
    
        // SQL query to get the user by email
        let userQuery = `SELECT * FROM users WHERE email = '${email}'`;
    
        try {
            const user = await new Promise((resolve, reject) => {
                db.query(userQuery, (error, results) => {
                    if (error) {
                        reject(new Error('Database query failed to fetch user.'));
                    } else {
                        resolve(results[0]);
                    }
                });
            });
            console.log(user);
            
    
            //  if the user doesn't exists
            if (!user) {
                errors.push(["Invalid Credentials."]);

            } else {
                const passwordCheck =await bcrypt.compare(password, user.password)
                // Check if the password matches
                // Assuming passwords are stored as plain text. For hashed passwords, use bcrypt.compare.
                if (!passwordCheck) {
                    errors.push(["Invalid Credentials."]);

                }
            }
    
            if (Object.keys(errors).length > 0) {
                const response = {
                    status: "fail",
                    errors: errors,
                    message: "User login failed"
                };
                return response;
            } else {
                return {
                    status: "success",
                    message: "User login successful",
                    token:  this.loginUser(user)
                };
            }
        } catch (error) {
            const response = {
                status: "fail",
                errors: 'User login failed.\n' + error,
                message: "User login failed"
            };
            return response;
        }
    }

    loginUser(user){
        const payload = {
            id: user.id,
            email: user.email
        }

        const options ={
            expiresIn: "30m",
            // httpOnly: true
        }
        return jwt.sign(payload, secretKey, options)

    }

    async logoutUser(res){
        
    }
    

    async forgotPassword(email, res){

    let forgottenPasswordQuery = `SELECT * FROM users WHERE email = '${email}'`

    try {
        const user = await new Promise((resolve, reject) => {
            db.query(forgottenPasswordQuery, (error, results) => {
                if (error) {
                    reject(new Error('Database query failed to fetch user.'));
                } else {
                    resolve(results[0]);
                }
            });
        });
        console.log(user);
        

        // Check if the user exists
        if (!user) {
            return res.status(404).json(
                {
                    status:"fail",
                    error:'email not found',
                    message:"user not found"
                }
            )

        } else {
            const otp = generateOTP();
            try {
                sendOtpEmail(email, otp)
                return res.status(200).json(
                    {
                        status:"success",
                        message:"otp sent successfully",
                        otp:otp
                    }
                )
            } catch (error) {
                const response = {
                    status: "fail",
                    errors: 'otp failed\n' + error,
                    message: "could not send otp mail"
                };
                return response;
                
                
            }

            
        }
    } catch (error) {
        const response = {
            status: "fail",
            errors: 'User login failed.\n' + error,
            message: "User login failed"
        };
        return response;
    }

    
    
    
    

    }
  
     


 

   

}

module.exports = AuthService;