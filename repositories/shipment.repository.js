import Shipment from '../models/shipment.model.js'

export const getAll = async (filter = {}, options = {}) => {
    const limit = Number(options.limit) || 10
    const page = Number(options.page) || 1
    const skip = (page - 1) * limit

    const [shipments, total] = await Promise.all([
        Shipment.find(filter)
            .skip(skip)
            .limit(limit)
            .lean(),

        Shipment.countDocuments(filter)
    ])

    return {
        shipments,
        total,
        totalPages: Math.ceil(total / limit),
        page,
        limit
    }
}

export const getById = async (id) => {
    return await Shipment.findById(id).lean()
}

export const getByTrackingNumber = async (trackingNumber) => {
    return await Shipment.findOne({ trackingNumber }).lean()
}

export const create = async (shipmentData) => {
    return await Shipment.create(shipmentData)
}

export const update = async (id, updatedFields) => {
    return await Shipment.findByIdAndUpdate(
        id,
        updatedFields,
        {
            new: true,
            runValidators: true
        }
    )
}

export const deleteById = async (id) => {
    return await Shipment.findByIdAndDelete(id)
}

export const addReceipt = async (id, receiptData) => {
    return await Shipment.findByIdAndUpdate(
        id,
        {
            $push: {
                receipts: receiptData
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
}