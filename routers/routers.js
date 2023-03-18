const controllers = require ("../controllers/controllers")
const {authenticateToken} =require ("../controllers/controllers")

function create_products_routes(app){
    app.get("/", controllers.allProducts)
} function create_oneproducts_routes(app){
    app.get("/product/:id", controllers.oneProducts)
}
function create_insproducts_routes(app){
    app.post("/new",authenticateToken, controllers.insProducts)
}
function create_registerusers_routes(app){
    app.post("/register", controllers.registerUsers)
}
function create_loginusers_routes(app){
    app.post("/login", controllers.loginUsers)   
}
function create_addproducts_routes(app){
    app.post("/addproduct", authenticateToken, controllers.addProducts)
}
function create_updateproducts_routes(app){
app.put("/update/:id", authenticateToken, controllers.updateProducts)
}
function create_deleteproducts_routes(app){
    app.delete("/delete/:id", authenticateToken, controllers.deleteProducts)
}

module.exports= {
    create_products_routes,
    create_oneproducts_routes,
    create_insproducts_routes,
    create_registerusers_routes,
    create_loginusers_routes,
    create_addproducts_routes,
    create_updateproducts_routes,
    create_deleteproducts_routes

}