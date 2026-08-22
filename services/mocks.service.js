import logger from "../config/logger.config.js"
import CustomError from "../errors/CustomError.js"
import { ERROR_TYPES } from "../errors/error.dictionary.js"
import { createCarts, createProducts, createUsers } from "../repositories/mocks.repository.js"
import { generateMockCart, generateMockProduct, generateMockUser } from "../utils/mock.generator.js"

export const validateQuantity = (quantity)=>{
    const amount = Number(quantity)

    if (!Number.isInteger(amount) || amount  <=0 ) {
        logger.warning(`Cantidad de mocks invalida: ${quantity}`)
        throw new CustomError(ERROR_TYPES.INVALID_MOCK_QUANTITY)
    }
    return amount
}

export const getMockUsers = (quantity)=>{
    const amount = validateQuantity(quantity)
    return Array.from({length: amount}, ()=>{
        return generateMockUser()
    })
}

export const getMockProducts = (quantity)=>{
    const amount = validateQuantity(quantity)
    return Array.from({length: amount}, ()=>{
        return generateMockProduct()
    })
}

export const getMockCarts = (quantity, productIds)=>{
    const amount = validateQuantity(quantity)
    return Array.from({length: amount}, ()=>{
        return generateMockCart(productIds)
    })
}

export const generateMockData = async ({ users, products, carts }) => {
    const usersAmount = validateQuantity(users)
    const productsAmount = validateQuantity(products)
    const cartsAmount = validateQuantity(carts)

    const mockedUsers = getMockUsers(usersAmount)
    await createUsers(mockedUsers)
    const mockedProducts = getMockProducts(productsAmount)
    const savedProducts = await createProducts(mockedProducts)
    const productIds = savedProducts.map(product => product._id)
    const mockedCarts = getMockCarts(cartsAmount, productIds)
    await createCarts(mockedCarts)
    logger.info('Mocks generados correctamente.')
    return {
        users: mockedUsers.length,
        products: savedProducts.length,
        carts: mockedCarts.length
    }
}