import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { PRODUCT_CATEGORIES } from "../constants/index.js";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 500,
    },
    code: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(PRODUCT_CATEGORIES)
    },
    thumbnail: {
        type: String,
        trim: true,
        default: 'product.jpg'
    }
}, { timestamps: true })

productSchema.plugin(paginate)

productSchema.index({ title: 1 }, { unique: true })
productSchema.index({ description: 'text' })
productSchema.index({ code: 1 }, { unique: true })
productSchema.index({ price: 1 })
productSchema.index({ category: 1 })
productSchema.index({ category: 1, price: 1 })

const Product = mongoose.model('Product', productSchema)

export default Product