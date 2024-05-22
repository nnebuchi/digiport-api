const db = require('../utils/db');

class AuthController {
    registerUser(req, res) {
        // req.body
        console.log(db);
        let my_query = `INSERT INTO users(email, password) VALUES ('buchi@gmail.com','Irene#2024')`;
       db.query(my_query, function (err, result) {
            if (err) {
                console.error('Error Interacting with database:', err);
                res.status(500).send('Error creating database');
                return;
            }
            console.log(result);
            res.send('Database created');
        });
    }
}

module.exports = AuthController;