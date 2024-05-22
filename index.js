const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('./controllers/AuthController');

const app = express();
const port = 4000;
const authController = new AuthController();

app.use(bodyParser.json());

app.post('/register', (req, res) => authController.registerUser(req, res));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});