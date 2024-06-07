    const mysql = require('mysql');

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database:'digiport'
    
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
        return db;
    });



    module.exports = db;
