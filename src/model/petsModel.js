const db = require('../config');
const { getMultiple } = require('../utils/helper');

// getMutiple;
async function petsIndex() {
  const sql = 'SELECT * FROM pets WHERE archived = 0';
  const [rows] = await db.query(sql);
  return rows;
}
async function petsRemove(id) {
  const sql = 'UPDATE pets SET archived = 1 WHERE id = ? LIMIT 1';
  const [rows] = await db.execute(sql, [id]);
  return rows.changedRows === 1;
}
async function petsCreate(name, dob, client_email) {
  const sql = `
  INSERT INTO
  pets (name, dob, client_email)
  VALUES
  (?,?,?);
  `;
  const [rows] = await db.execute(sql, [name, dob, client_email]);
  return rows.affectedRows === 1;
}

// function petsIndex() {
//   return getMultiple('SELECT * FROM pets11 WHERE archived = 0');
// }

module.exports = {
  petsIndex,
  petsRemove,
  petsCreate,
};
