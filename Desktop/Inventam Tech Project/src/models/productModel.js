const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({ 
    categoryName: { type: String, require: true },
    subcategory:{
            gender: {  type: String,required: true,enum: ["male", "female"],trim: true },
            price: { type: Number, required: true},
            size:{type:String,required: true,trim: true},
            colour:{type:String,required: true,trim: true}
        },
             
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false }        

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)