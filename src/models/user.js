import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

import Order from '../models/order';
import { isRegExp } from 'util';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        dui: { type: String, unique: true },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            validate: value => {
                if (!validator.isEmail(value))
                    throw new Error('email invalido');
            },
        },
        password: { type: String, required: true },
        roles: {
            type: [
                {
                    type: String,
                    required: true,
                    enum: ['ADMIN', 'EMPLOYEE', 'CLIENT'],
                    default: 'CLIENT',
                },
            ],
            default: ['CLIENT'],
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', function(next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, 8, (error, hash) => {
            if (error) {
                throw new Error(error);
            } else {
                user.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.post('deleteOne', (doc, next) => {
    Order.deleteMany({ client: doc._id }, error => {
        if (error) next(error);
        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
