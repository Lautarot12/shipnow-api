import User from "../models/user.model.js";

export const getUserByEmail = async (email)=>{
    return await User.findOne({ email })
}

export const createUser = async (userData)=>{
    return await User.create(userData)   
}

export const getUserById = async (id) =>{
    return await User.findById(id)
}

export const addDocumentToUser = async (id, documentData)=>{
    return await User.findByIdAndUpdate(id,
    {$push: {documents: documentData}},
    {new: true}
)}