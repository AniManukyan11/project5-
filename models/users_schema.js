const sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, role TEXT, username TEXT, password TEXT ) ';

function createUsersTable(db) {
    db.run(sql);
}

module.exports = { createUsersTable }