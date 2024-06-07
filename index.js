const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('./controllers/AuthController');
const db = require('./utils/db')

const app = express();
const port = 4006;
const authController = new AuthController();

app.use(bodyParser.json());
// app.use('/api/auth', authController);

app.post('/register', (req, res) => authController.registerUser(req, res));
app.post('/login',(req, res)=>authController.loginUser(req, res));



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});