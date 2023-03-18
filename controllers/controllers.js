const CryptoJS = require ("crypto-js")
const jwt = require('jsonwebtoken')
const sqlite3 = require('sqlite3').verbose()
require('dotenv').config();
const SECRET = process.env.SECRET


let db = new sqlite3.Database("database.db", (err)=>{
    if(err){
        console.log("err")
    }
    console.log("Connected to the database.")
})

function allProducts(req, res) {
    db.all("select * from products", [], (err, data)=>{
        res.send(data)
    })
}

function oneProducts(req, res) {
    const id = req.params.id
    db.get("select * from products where id=?", [id], (err, data)=>{
        res.send(data)
    })
}

function insProducts(req, res) {
    const name = req.body.name
    const price = req.body.price
    db.run("insert into products(name, price) values(?,?)", [name, price], ()=>{
        res.send("OK")
    })
}
function registerUsers (req, res){
    const name = req.body.name
    const role = req.body.role
    const username = req.body.username
    const password = req.body.password
    console.log(req.body)
    const hashed_password = CryptoJS.SHA256(password).toString()
    db.run("insert into users(name, role, username, password) values(?,?,?,?)", [name, role, username, hashed_password],(err)=>{
        if(err){
            res.send(JSON.stringify({status: "Error Reigstering"}))
        }
        res.send(JSON.stringify({status: "User Created"}))
    })
}
function generateAccessToken(username, role){ 
    console.log(SECRET)
    return jwt.sign({username, role}, SECRET, {expiresIn: '36000s'})
}
function authenticateToken(req, res , next) {
    const token = req.headers.authorization;
    
    if (token == null){
        return res.sendStatus(401);
    } 
    
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }    
      next();
    })

}

function loginUsers(req, res) {
    const username = req.body.username
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    db.get('SELECT * FROM users WHERE username = ?', [username], (error, row) => {
        if(username === row.username && hashed_password === row.password) {
            const token = generateAccessToken(row.username, row.role);
            res.send(JSON.stringify({status:'Logged in', jwt: token}));
        } else {
            res.send(JSON.stringify({ status:'Wrong Password' }));
        }

    })
  } 
function addProducts (req, res) {
    const token= req.headers.authorization
    const decoded = jwt.decode(token)
    if ( decoded.role === "admin"){
         const name = req.body.name
         const price = req.body.price
         db.run("insert into products (name, price) values (?,?)", [name, price], (error)=>{
             res.send("added")
         } )
    } else {
        res.send("No access")
    }  
}
function updateProducts (req, res) {
    const token= req.headers.authorization
    const decoded = jwt.decode(token)
    if (decoded.role === "admin"){
          const name = req.body.name
    const price = req.body.price
    const id = req.params.id
    db.run("update products set name=?, price=? where id=?", [name, price, id], ()=>{
        res.send("OK")
    })
    } else {
        res.send("No access")
    }
}
function deleteProducts (req,res) {
    const token= req.headers.authorization
    const decoded = jwt.decode(token)
    if(decoded.role === "admin"){
      const id = req.params.id
    db.get("delete from products where id=?", [id], ()=>{
        res.send("OK")
    })  
    } else{
        res.send("No access")
    }
    
}
module.exports = {
    allProducts, 
    oneProducts,
    insProducts,
    registerUsers,
    loginUsers,
    addProducts,
    updateProducts,
    deleteProducts,
    authenticateToken

}