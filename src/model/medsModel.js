const db = require('../config');

async function medsIndex() {
  const [rows] = await db.query('SELECT * FROM medications');
  return rows;
}
async function medsCreate(name, description) {
  const [rows] = await db.execute('INSERT INTO medications (name, description) VALUES (?,?)', [
    name,
    description,
  ]);
  return rows.affectedRows === 1;
}

module.exports = {
  medsIndex,
  medsCreate,
};
