   // Read
   const getUsers = () => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      console.log(results);
    });
  };
  
  // Update
  const updateUser = (id, age) => {
    const sql = 'UPDATE users SET age = ? WHERE id = ?';
    db.query(sql, [age, id], (err, result) => {
      if (err) throw err;
      console.log('User updated:', result.message);
    });
  };
  
  // Delete
  const deleteUser = (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      console.log('User deleted:', result.message);
    });
  }; 
  
