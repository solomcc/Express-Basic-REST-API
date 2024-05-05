const exp = require("constants")
const express = require("express")


const path = require("path")
const app = express()
app.set("views", path.join(__dirname,"productPages"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

var productData = [
    {name:"Product 1", price:"10", description:"Product 1 decription"},
    {name:"Product 2", price:"20", description:"Product 2 decription"},
    {name:"Product 3", price:"30", description:"Product 3 decription"},
]

app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})

app.get("/products",(req,res)=>{
    // res.send("page loading")
    res.render("products",{products:productData})
})

app.get("/editProduct/:itemId",(req,res)=>{
    var itemId = req.params.itemId;

    res.render("editProduct",{product:productData[itemId],id:itemId})
})

app.post("/editProduct/:itemId",(req,res)=>{
    var itemId = req.params.itemId;
    var data = req.body;
    productData[itemId] = data
    res.redirect(303, "/products")
})


app.get("/addProduct",(req,res)=>{
    res.render("addNewProduct")
})

app.post("/addProduct",(req,res)=>{
    var data = req.body;
    productData.push(data);
    res.redirect(303, "/products")
})

app.listen(80,()=>{
    console.log("serving in port 80")
})
