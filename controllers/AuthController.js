const db = require('../utils/db');

class AuthController {
    registerUser(req, res) {
        console.log(db);
        // db.query("CREATE DATABASE mydb", function (err, result) {
        //     if (err) {
        //         console.error('Error creating database:', err);
        //         res.status(500).send('Error creating database');
        //         return;
        //     }
        //     console.log("Database created");
        //     res.send('Database created');
        // });
    }
}

module.exports = AuthController;