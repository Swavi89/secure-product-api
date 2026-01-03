const db = require('../../config/database');


exports.create = (product) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO products (product_name, product_quantity) VALUES (?, ?)',
      [product.product_name, product.product_quantity],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            'SELECT * FROM products WHERE id = ?',
            [this.lastID],
            (err, row) => {
              if (err) reject(err);
              else resolve(row);
            }
          );
        }
      }
    );
  });
};


exports.findAll = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM products WHERE id = ?',
      [id],
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


exports.update = (id, product) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE products 
       SET product_name = ?, 
           product_quantity = ?
       WHERE id = ?`,
      [product.product_name, product.product_quantity, id],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        if (this.changes === 0) {
          resolve(null); 
        } else {
          db.get(
            'SELECT * FROM products WHERE id = ?',
            [id],
            (err, row) => {
              if (err) reject(err);
              else resolve(row);
            }
          );
        }
      }
    );
  });
};


exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM products WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ 
            deleted: this.changes > 0, 
            changes: this.changes 
          });
        }
      }
    );
  });
};