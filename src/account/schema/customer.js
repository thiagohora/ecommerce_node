import mongoose from 'mongoose';
import passport from 'passport-local-mongoose';

const Customer = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    birthday: {
        day: {
            type: Number,
            required: true,
            default: ''
        },
        month: {
            type: Number,
            required: true,
            default: ''
        },
        year: {
            type: Number,
            required: true,
            default: ''
        }
    },
    cpf: {
        type: String,
        required: true
    },
    celphone: {
        type: String,
        required: true,
        default: ''
    },
    address:{
        street: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
         neightborhood: {
            type: String,
            required: true
        }
    }

});

Customer.plugin(passport, { usernameField: 'email' });

export default mongoose.model('Customer', Customer);