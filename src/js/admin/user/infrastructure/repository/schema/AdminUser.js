import mongoose from 'mongoose';
import passport from 'passport-local-mongoose';

const AdminUser = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    }
});

AdminUser.plugin(passport, { usernameField: 'email' });

export default mongoose.model('AdminUser', AdminUser);