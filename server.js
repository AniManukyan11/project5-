const  express = require('express')
const sqlite3 = require('sqlite3').verbose()
const CryptoJS = require('crypto-js')
const app = express()
const port = 5000
app.use(express.json())
const jwt = require('jsonwebtoken')
const _ = require('lodash/lodash')
const users_schema = require("./models/users_schema")
const product_schema = require("./models/product_schema")
const cart_schema =require("./models/cart_schema")
const cartitem_schema = require("./models/cartitems_schema")
const routers = require("./routers/routers")
require('dotenv').config()

let db = new sqlite3.Database("database.db", (err)=>{
    if(err){
        console.log("err")
    }
    console.log("Connected to the database.")
})
cart_schema.createCartsTabel(db)
cartitem_schema.createCartItemsTable(db)
users_schema.createUsersTable(db)
product_schema.createProductsTable(db)
routers.create_products_routes(app)
routers.create_oneproducts_routes(app)
routers.create_insproducts_routes(app)
routers.create_registerusers_routes(app)
routers.create_loginusers_routes(app)
routers.create_addproducts_routes(app)
routers.create_updateproducts_routes(app)
routers.create_deleteproducts_routes(app)


app.listen(port)