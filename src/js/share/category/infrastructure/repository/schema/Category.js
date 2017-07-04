import mongoose from 'mongoose';

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    enable: {
        type: Boolean,
        required:true,
        default: true
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    }
});

export default mongoose.model('Category', Category);