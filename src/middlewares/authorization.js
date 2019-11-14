import jwt from "jsonwebtoken";
import User from "../models/user";
import { JWT_KEY } from "../../config";

module.exports = allowedRoles => (req, res, next) => {
    console.log(allowedRoles);
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, JWT_KEY);
        console.log("token data: ", data);
        User.findOne({ _id: data.id }, (err, user) => {
            if (err) throw new Error(err);
            if (!user)
                throw new Error({ error: "token no valido para usuario" });

            console.log(user);
            if (allowedRoles)
                if (!user.roles.every(role => allowedRoles.indexOf(role) >= 0))
                    throw new Error({ error: "No tiene permisos suficientes" });

            req.user = user;
            req.token = token;

            next();
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: "failed",
            message: "Ha ocurrido un error",
            data: null
        });
    }
};
