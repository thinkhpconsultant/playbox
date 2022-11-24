const express = require('express');
const router = express.Router();
const { createProduct, getProduct, deleteProduct ,updateProduct} = require("../controllers/productController")



router.post("/products", createProduct)
router.put("/products/:productId",updateProduct)
router.delete("/products/:productId", deleteProduct)
router.get("/products",getProduct)



module.exports = router;