import { generateMockData, getMockCarts, getMockProducts, getMockUsers } from "../services/mocks.service.js"


export const getUsersMock = (req, res, next) => {
    try {
        const quantity = req.query.quantity
        const usersMock = getMockUsers(quantity)
        return res.status(200).json({
            status: 'success',
            message: 'Usuarios simulados creados exitosamente', payload: usersMock
        })
    } catch (error) {
        next(error)
    }
}

export const getProductsMock = (req, res, next) => {
    try {
        const quantity = req.query.quantity
        const productsMock = getMockProducts(quantity)
        return res.status(200).json({
            status: 'success',
            message: 'Productos simulados creados exitosamente', payload: productsMock
        })
    } catch (error) {
        next(error)
    }
}

export const getCartsMock = (req, res, next) => {
    try {
        const quantity = req.query.quantity
        const cartsMock = getMockCarts(quantity)
        return res.status(200).json({
            status: 'success',
            message: 'Carritos simulados creados correctamente', payload: cartsMock
        })
    } catch (error) {
        next(error)
    }
}

export const generateMocks = async (req, res, next)=>{
    try {
        const result = await generateMockData(req.body)

        return res.status(201).json({
            status: 'success',
            message: 'Datos simulados generados correctamente',
            payload: result
        })
    } catch (error) {
        next(error)
    }
}