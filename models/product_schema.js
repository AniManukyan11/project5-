const sql = 'CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, name TEXT, price integer) ';

function createProductsTable(db) {
    db.run(sql);
}

module.exports = { createProductsTable }