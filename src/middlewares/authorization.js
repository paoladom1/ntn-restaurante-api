import jwt from "jsonwebtoken";
import User from "../models/user";
import { JWT_KEY } from "../../config";

module.exports = allowedRoles => (req, res, next) => {
    try {
        const token = req.header("Authorization")
            ? req.header("Authorization").replace("Bearer ", "")
            : null;
        if (token === null)
            return res.status(400).json({
                status: "failed",
                message: "No token provided on headers",
                data: null
            });

        const data = jwt.verify(token, JWT_KEY);
        console.log(data);

        User.findOne({ _id: data._id }, (err, user) => {
            console.log("user: ", user);
            if (err)
                res.status(500).json({
                    status: "failed",
                    message: "error inesperado",
                    data: null
                });
            if (!user)
                return res.status(403).json({
                    status: "failed",
                    message: "token no valido para usuario",
                    data: null
                });

            console.log(user);
            if (allowedRoles)
                if (
                    !user.roles.every(role => allowedRoles.indexOf(role) >= 0)
                ) {
                    return res
                        .status(403)
                        .json({
                            status: "unauthorized",
                            message: "Usuario sin suficientes permisos",
                            data: null
                        })
                        .send();
                }

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
