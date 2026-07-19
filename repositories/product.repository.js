import Product from "../models/product.model.js";

export const getAll = async (filter, options) => {
    const paginationOptions = {
        limit: Number(options.limit) || 10,
        page: Number(options.page) || 1,
        sort: options.sort || {},
        lean: true
    }

    return Product.paginate(filter, paginationOptions)
}

export const getById = async (id)=>{
    const productFound = await Product.findById(id)
    return productFound
}

export const getByCode = async (code)=>{
    const prodFoundByCode = await Product.findOne({ code })
    return prodFoundByCode
}

export const create = async (body)=>{
    const createdProd = await Product.create(body)
    return createdProd
}

export const update = async (id, updatedFields)=>{
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updatedFields,
        {
            new: true,
            runValidators: true
        }
    )
    return updatedProduct
}

export const deleteById = async (id)=>{
    const deletedProduct = await Product.findByIdAndDelete(id)
    return deletedProduct
}