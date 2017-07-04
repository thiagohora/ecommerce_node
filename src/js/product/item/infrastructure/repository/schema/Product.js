import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ''
    },
    image: {
        type: String
    },
    discount: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true
    },
    sales_price: {
        type: Number,
        required:true,
        default: 0
    },
    real_price: {
        type: Number,
        required:true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity : {
        type: Number,
        required: true,
        default: 0
    },
    enable: {
        type: Boolean,
        required: true,
        default:true
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    }
});

export default mongoose.model('Product', Product);