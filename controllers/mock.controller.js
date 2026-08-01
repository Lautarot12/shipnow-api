import { generateMockData, getMockCarts, getMockProducts, getMockUsers } from "../services/mocks.service.js"


export const getUsersMock = (req, res) => {
    const quantity = Number(req.query.quantity) || 10
    const usersMock = getMockUsers(quantity)
    return res.status(200).json({
        status: 'success',
        message: 'Usuarios simulados creados exitosamente', payload: usersMock
    })
}

export const getProductsMock = (req, res) => {
    const quantity = Number(req.query.quantity) || 10
    const productsMock = getMockProducts(quantity)
    return res.status(200).json({
        status: 'success',
        message: 'Productos simulados creados exitosamente', payload: productsMock
    })
}

export const getCartsMock = (req, res) => {
    const quantity = Number(req.query.quantity) || 10
    const cartsMock = getMockCarts(quantity)
    return res.status(200).json({
        status: 'success',
        message: 'Carritos simulados creados correctamente', payload: cartsMock
    })
}

export const generateMocks = async (req, res)=>{
    try {
        const result = await generateMockData(req.body)

        return res.status(201).json({
            status: 'success',
            message: 'Datos simulados generados correctamente',
            payload: result
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}