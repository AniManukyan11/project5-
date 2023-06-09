const sql = 'CREATE TABLE IF NOT EXISTS cartItems (cartitem_id INTEGER PRIMARY KEY, cart_id INTEGER NOT NULL, product_id INTEGER NOT NULL, count INTEGER, FOREIGN KEY (cart_id) REFERENCES carts(cart_id),FOREIGN KEY (product_id) REFERENCES products(product_id))';

function createCartItemsTable(db) {
    db.run(sql);
}

module.exports = { createCartItemsTable }