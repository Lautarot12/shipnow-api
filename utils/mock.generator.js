import { faker } from "@faker-js/faker"
import { AUTH_PROVIDERS, PRODUCT_CATEGORIES, USER_ROLES } from "../constants/index.js"
import mongoose from "mongoose"

export const generateMockUser = ()=>{
    return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    provider: faker.helpers.arrayElement(Object.values(AUTH_PROVIDERS)),
    role: faker.helpers.arrayElement(Object.values(USER_ROLES))
    }
}

export const generateMockProduct = ()=>{
    return {
        title: `${faker.commerce.productName()} ${faker.string.alphanumeric(6)}`,
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(8).toUpperCase(),
        price: faker.number.int({
            min: 100,
            max: 5000
        }),
        stock: faker.number.int({
            min: 0,
            max: 100
        }),
        status: faker.datatype.boolean(),
        category: faker.helpers.arrayElement(Object.values(PRODUCT_CATEGORIES)),
    }
}

export const generateMockCart = ( productIds = [] )=>{
    const cantidadProductos = faker.number.int({
        min: 1, 
        max: 5
    })
    
    return { 
        products: Array.from({length: cantidadProductos}, ()=> {
            const productId = productIds.length > 0 ? faker.helpers.arrayElement(productIds) : new mongoose.Types.ObjectId()
            return { product: productId,
                quantity: faker.number.int({
                            min: 1,
                            max: 10})
                }
            }
        )
    }  
}
