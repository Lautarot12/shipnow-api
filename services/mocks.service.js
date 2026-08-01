import { createCarts, createProducts, createUsers } from "../repositories/mocks.repository.js"
import { generateMockCart, generateMockProduct, generateMockUser } from "../utils/mock.generator.js"


export const getMockUsers = (quantity)=>{
    const amount = Number(quantity) || 10
    return Array.from({length: amount}, ()=>{
        return generateMockUser()
    })
}

export const getMockProducts = (quantity)=>{
    const amount = Number(quantity) || 10
    return Array.from({length: amount}, ()=>{
        return generateMockProduct()
    })
}

export const getMockCarts = (quantity, productIds)=>{
    const amount = Number(quantity) || 10
    return Array.from({length: amount}, ()=>{
        return generateMockCart(productIds)
    })
}

export const generateMockData = async ({ users, products, carts }) => {
    const mockedUsers = getMockUsers(users)
    await createUsers(mockedUsers)
    const mockedProducts = getMockProducts(products)
    const savedProducts = await createProducts(mockedProducts)
    const productIds = savedProducts.map(product => product._id)
    const mockedCarts = getMockCarts(carts, productIds)
    await createCarts(mockedCarts)
    return {
        users: mockedUsers.length,
        products: savedProducts.length,
        carts: mockedCarts.length
    }
}