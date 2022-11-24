const productModel = require('../models/productModel')
const ObjectId = require('mongoose').Types.ObjectId
const mongoose = require("mongoose");

const isValid = function(x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};

const isValidBody = function(x) {
    return Object.keys(x).length > 0;
};

const isvalidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const createProduct = async function (req, res) {
    try {
        let body = req.body
        let categoryName = body.categoryName
        let { gender,price,size,colour } = body.subcategory

        if (!isValidBody(body))  return res.status(400).send({ status: false, message: "Body cannot be empty" })
        if (!isValid(categoryName)) return res.status(400).send({ status: false, message: "Name is required" })
        if (!isValid(gender)) return res.status(400).send({ status: false, message: "Gender is required" })
        if (!isValid(price)) return res.status(400).send({ status: false, message: "Colour is required" })
        if (!isValid(size)) return res.status(400).send({ status: false, message: "AvailableSizes is required" })
        if (!isValid(colour)) return res.status(400).send({ status: false, message: "Price is required" })

       
        let productData = await productModel.create(body)
        return res.status(201).send({ status: true, message: "Product created successfully", productData })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
    }
}

const updateProduct=async function(req,res){
    try{
        let body=req.body;
        let productId = req.params.productId;

        if (!isvalidObjectId(productId)) {
            return res.status(400).send({ status: false, message: "please enter valid productId" })
        }

        let categoryName = body
        let { gender,price,size,colour} = body.subcategory
       

       

        let findProduct = await productModel.findOne({ _id: productId,isDeleted: false })
        if(!findProduct) return res.status(404).send({status:false,message:"product not found"})

        if(categoryName) findProduct.categoryName = body.categoryName
        gender = gender.toLowerCase()
        if(gender) findProduct.subcategory.gender = gender

        if(price) findProduct.subcategory.price = price
        if(size) findProduct.subcategory.size = size
        if(colour) findProduct.subcategory.colour = colour
        

    

        await findProduct.save()
        return res.status(200).send({ status: true, message: "Updated successfully", data: findProduct })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
    }
}


const deleteProduct = async function (req, res) {
    try {
        let productId = req.params.productId;

        if (!isvalidObjectId(productId)) {
            return res.status(400).send({ status: false, message: "please enter valid productId" })
        }

        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) { return res.status(404).send({ status: false, message: "Product does not exist" }) }

        await productModel.updateMany({ _id: productId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } })

        return res.status(200).send({ status: true, message: "Product deleted successfully" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const getProduct = async function (req, res) {
    try {
        const{page=1,limit=5}=req.query

        let data = req.query;

        const productDetail = await productModel.find({ $and: [data, { isDeleted: false }] }).limit(limit*1).skip((page-1)*limit)


        if (productDetail.length == 0) {
            return res.status(404).send({ status: false, msg: "No Product found" });
        }

        if (productDetail.length > 0) {
            return res.status(200).send({ status: true, message: "Product List", data: productDetail });
        }
        else {
            return res.status(404).send({ status: false, message: "No Product found" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports = { createProduct,updateProduct,deleteProduct,getProduct }