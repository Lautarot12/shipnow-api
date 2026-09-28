import mongoose from 'mongoose'
import { SHIPMENT_STATUS } from '../constants/index.js'

const receiptSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
})

const shipmentSchema = new mongoose.Schema({
    trackingNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(SHIPMENT_STATUS),
        default: SHIPMENT_STATUS.PENDING
    },
    origin: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    receipts: {
        type: [receiptSchema],
        default: []
    }
}, {
    timestamps: true
})

export default mongoose.model('Shipment', shipmentSchema)