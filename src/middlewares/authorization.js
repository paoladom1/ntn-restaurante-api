import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_KEY } from '../../config';

module.exports = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, JWT_KEY);

    try {
        User.findById(data._id, (err, user) => {
            if(!err) throw new Error(err)
            if(!user) throw new Error({ error: "token no valido para usuario" });

            console.log(user);
            req.user = user;
            req.token = token;

            next();
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: "failed", message: "No tienes permisos para esto", data: null })
    }
}