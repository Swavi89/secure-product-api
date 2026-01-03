const db = require('../../config/database');

exports.create = (user) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, user.token],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ 
            id: this.lastID, 
            name: user.name,
            email: user.email,
            token: user.token
          });
        }
      }
    );
  });
};

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row); 
        }
      }
    );
  });
};

exports.findByToken = (token) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, name, email, token FROM users WHERE token = ?',
      [token],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};