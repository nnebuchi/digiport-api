const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('./controllers/AuthController');
const db = require('./utils/db')
const UserController = require('./controllers/UserController');

const app = express();
const port = 4006;
const authController = new AuthController();
const userController = new UserController();

app.use(bodyParser.json());
// app.use('/api/auth', authController);

app.post('/register', (req, res) => authController.registerUser(req, res));
app.post('/login',(req, res)=>authController.loginUser(req, res));
app.post('/forgot-password',(res, req)=>authController.forgotPassword(req, res))
app.post('/update-profile', (req, res)=>userController.updateProfile(req,res))
app.get('/logout', (req, res)=>authController.logoutUser(req, res))
app.post('/socials', (req, res)=>userController.socials(req,res))
app.post('/corporate-profile', (req, res)=>userController.corporateProfile(req,res))
app.get('/insight', (req, res)=>userController.insight(req,res))
app.post('/skills', (req, res)=>userController.skillSet(req,res))
app.post('/project', (req, res)=>userController.project(req,res))
app.post('/education', (req, res)=>userController.education(req,res))
app.post('/certification', (req, res)=>userController.certifications(req,res))



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});