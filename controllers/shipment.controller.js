import {
    getShipments,
    getShipmentById,
    getShipmentByTracking,
    createShipment,
    updateShipment,
    deleteShipment,
    addShipmentReceipt
} from '../services/shipment.service.js'

export const getAllShipments = async (req, res, next) => {
    try {
        const shipments = await getShipments(req.query)
        return res.status(200).json(shipments)
    } catch (error) {
        next(error)
    }
}

export const getShipment = async (req, res, next) => {
    try {
        const shipment = await getShipmentById(req.params.sid)
        return res.status(200).json({
            status: 'success',
            payload: shipment
        })
    } catch (error) {
        next(error)
    }
}

export const getShipmentTracking = async (req, res, next) => {
    try {
        const shipment = await getShipmentByTracking(req.params.trackingNumber)
        return res.status(200).json({
            status: 'success',
            payload: shipment
        })
    } catch (error) {
        next(error)
    }
}

export const createShipmentController = async (req, res, next) => {
    try {
        const shipment = await createShipment(req.body)

        return res.status(201).json({
            status: 'success',
            message: 'Envío creado correctamente',
            payload: shipment
        })
    } catch (error) {
        next(error)
    }
}

export const updateShipmentController = async (req, res, next) => {
    try {
        const shipment = await updateShipment(
            req.params.sid,
            req.body
        )

        return res.status(200).json({
            status: 'success',
            message: 'Envío actualizado correctamente',
            payload: shipment
        })
    } catch (error) {
        next(error)
    }
}

export const deleteShipmentController = async (req, res, next) => {
    try {
        const shipment = await deleteShipment(req.params.sid)

        return res.status(200).json({
            status: 'success',
            message: 'Envío eliminado correctamente',
            payload: shipment
        })
    } catch (error) {
        next(error)
    }
}

export const uploadShipmentReceipt = async (req, res, next) => {
    try {
        const shipment = await addShipmentReceipt(
            req.params.sid,
            req.file
        )

        return res.status(200).json({
            status: 'success',
            message: 'Comprobante subido correctamente',
            payload: shipment
        })
    } catch (error) {
        next(error)
    }
}