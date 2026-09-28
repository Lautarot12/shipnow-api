import mongoose from 'mongoose'
import {
    getAll,
    getById,
    getByTrackingNumber,
    create,
    update,
    deleteById,
    addReceipt
} from '../repositories/shipment.repository.js'
import { getUserById } from '../repositories/auth.repository.js'
import CustomError from '../errors/CustomError.js'
import { ERROR_TYPES } from '../errors/error.dictionary.js'
import { SHIPMENT_STATUS } from '../constants/index.js'
import fs from 'fs/promises'
import logger from '../config/logger.config.js'


export const getShipments = async (queryparams = {}) => {
    const {
        limit = 10,
        page = 1,
        status,
        user
    } = queryparams

    const parsedLimit = Math.min(Number(limit) || 10, 100)
    const parsedPage = Math.max(Number(page) || 1, 1)

    const filter = {}

    if (status) {
        if (!Object.values(SHIPMENT_STATUS).includes(status)) {
            throw new CustomError(ERROR_TYPES.INVALID_SHIPMENT_STATUS)
        }

        filter.status = status
    }

    if (user) {
        if (!mongoose.Types.ObjectId.isValid(user)) {
            throw new CustomError(ERROR_TYPES.INVALID_ID)
        }

        filter.user = user
    }

    const data = await getAll(filter, {
        limit: parsedLimit,
        page: parsedPage
    })

    return {
        status: 'success',
        payload: data.shipments,
        total: data.total,
        totalPages: data.totalPages,
        page: data.page,
        limit: data.limit
    }
}

export const getShipmentById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(ERROR_TYPES.INVALID_ID)
    }

    const shipment = await getById(id)

    if (!shipment) {
        throw new CustomError(ERROR_TYPES.SHIPMENT_NOT_FOUND)
    }

    return shipment
}

export const getShipmentByTracking = async (trackingNumber) => {
    const shipment = await getByTrackingNumber(trackingNumber)

    if (!shipment) {
        throw new CustomError(ERROR_TYPES.SHIPMENT_NOT_FOUND)
    }

    return shipment
}

export const createShipment = async (shipmentData) => {
    const {
        trackingNumber,
        user
    } = shipmentData

    if (!mongoose.Types.ObjectId.isValid(user)) {
        throw new CustomError(ERROR_TYPES.INVALID_ID)
    }

    const userFound = await getUserById(user)

    if (!userFound) {
        throw new CustomError(ERROR_TYPES.USER_NOT_FOUND)
    }

    const trackingFound = await getByTrackingNumber(trackingNumber)

    if (trackingFound) {
        throw new CustomError(ERROR_TYPES.DUPLICATE_TRACKING_NUMBER)
    }

    return await create(shipmentData)
}

export const updateShipment = async (id, updatedFields) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(ERROR_TYPES.INVALID_ID)
    }

    const shipment = await getShipmentById(id)

    if (updatedFields.status) {
        if (!Object.values(SHIPMENT_STATUS).includes(updatedFields.status)) {
            throw new CustomError(ERROR_TYPES.INVALID_SHIPMENT_STATUS)
        }
    }

    if (updatedFields.user) {
        if (!mongoose.Types.ObjectId.isValid(updatedFields.user)) {
            throw new CustomError(ERROR_TYPES.INVALID_ID)
        }

        const userFound = await getUserById(updatedFields.user)

        if (!userFound) {
            throw new CustomError(ERROR_TYPES.USER_NOT_FOUND)
        }
    }

    if (updatedFields.trackingNumber) {
        const trackingFound = await getByTrackingNumber(updatedFields.trackingNumber)

        if (trackingFound && trackingFound._id.toString() !== shipment._id.toString()) {
            throw new CustomError(ERROR_TYPES.DUPLICATE_TRACKING_NUMBER)
        }
    }

    return await update(id, updatedFields)
}

export const deleteShipment = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(ERROR_TYPES.INVALID_ID)
    }

    const shipment = await getShipmentById(id)

    return await deleteById(shipment._id)
}

export const addShipmentReceipt = async (shipmentId, file) => {
    if (!mongoose.Types.ObjectId.isValid(shipmentId)) {
        if (file) await fs.unlink(file.path).catch(() => {})
        throw new CustomError(ERROR_TYPES.INVALID_ID)
    }

    if (!file) {
        throw new CustomError(ERROR_TYPES.MISSING_FILE)
    }

    const shipment = await getById(shipmentId)

    if (!shipment) {
        await fs.unlink(file.path).catch(() => {})
        throw new CustomError(ERROR_TYPES.SHIPMENT_NOT_FOUND)
    }

    const receiptData = {
        originalName: file.originalname,
        fileName: file.filename,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size
    }

    try {
        const updatedShipment = await addReceipt(
            shipmentId,
            receiptData
        )

        logger.info(
            `Comprobante asociado correctamente. Shipment ID: ${shipmentId}, Archivo: ${receiptData.originalName}`
        )

        return updatedShipment
    } catch (error) {
        await fs.unlink(file.path).catch(() => {})
        logger.error(`Error al guardar el comprobante: ${error.message}`)
        throw new CustomError(ERROR_TYPES.FILE_SAVE_ERROR)
    }
}