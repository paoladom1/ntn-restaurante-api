import User from "../models/user";
import Order from "../models/order";
import Food from "../models/food";

import { JWT_KEY } from "../../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

module.exports.getUserById = (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, user) => {
        if (err)
            return res.status(500).json({
                status: "error",
                message: err._message,
                data: err
            });

        return res.status(200).json({
            status: "success",
            message: "user retrieved",
            data: { user }
        });
    });
};

module.exports.getUserOrders = (req, res) => {
    const { id } = req.params;

    User.findById(id, "orders", (err, user) => {
        if (err)
            return res.status(500).json({
                status: "failed",
                message: err._message,
                data: err
            });

        const { orders } = user;

        return res.status(200).json({
            status: "success",
            message: "user orders retrieved",
            data: { orders: Array.isArray(orders) ? orders : [orders] }
        });
    });
};

module.exports.createUserOrder = (req, res) => {
    const { id } = req.params;
    const { products } = req.body;

    User.findById(id, (err, user) => {
        if (err)
            return res.status(500).json({
                status: "error",
                message: err._message,
                data: err
            });

        //console.log(`user: ${user}`);
        Food.find({ _id: { $in: products } }, (error, docs) => {
            if (error)
                return res.status(500).json({
                    status: "error",
                    message: err._message,
                    data: err
                });

            //console.log(`foodList: ${foodList}`);
            const foodList = Array.isArray(docs) ? docs : [docs];

            const foods = products.map(product =>
                foodList.find(doc => product === doc._id.toString())
            );

            const newOrder = new Order({
                products: foods
            });

            newOrder
                .save()
                .then(order => {
                    order.markModified("order");
                    user.orders.push(order);
                    user.markModified("orders");
                    //console.log(`user: ${user}`);

                    user.save()
                        .then(savedUser => {
                            //console.log(`saved_user: ${savedUser}`);
                            return res.status(201).json({
                                status: "success",
                                message: "order created",
                                data: {
                                    order,
                                    user: savedUser
                                }
                            });
                        })
                        .catch(error => {
                            return res.status(500).json({
                                status: "error",
                                message: error._message,
                                data: error
                            });
                        });
                })
                .catch(error => res.status(500).json(error));
        });
    });
};

module.exports.getUsers = (req, res) => {
    const { filter } = req.body;

    User.find(filter, (err, users) => {
        if (err)
            return res.status(500).json({
                status: "failed",
                message: err,
                data: null
            });
        else
            return res.status(200).json({
                status: "success",
                count: users.length,
                message: `${users.length} users fetched`,
                data: { users }
            });
    });
};

module.exports.createUser = (req, res) => {
    const { name, dui, email, password, roles } = req.body;

    try {
        const user = new User({
            name,
            dui,
            email,
            password,
            roles
        });

        user.save()
            .then(user => {
                return res.status(201).json({
                    status: "success",
                    message: "user created",
                    data: { user }
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(400).json({
                    status: "failed",
                    message: error._message,
                    data: error
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
};

module.exports.authenticate = (req, res, next) => {
    //Login a registered user
    try {
        const { email, password } = req.body;

        User.findOne({ email }, (err, user) => {
            if (err) next(err);
            else {
                if (!user)
                    return res.status(400).json({
                        status: "failed",
                        message: "email not found on database",
                        data: null
                    });
                bcrypt.compare(password, user.password, (_, result) => {
                    if (!result)
                        return res.status(400).json({
                            status: "failed",
                            message: "password incorrect",
                            data: null
                        });
                    else {
                        const token = jwt.sign({ _id: user._id }, JWT_KEY, {
                            expiresIn: "1w"
                        });

                        return res.status(200).json({
                            status: "success",
                            message: "user authenticated",
                            data: { user, token }
                        });
                    }
                });
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports.updateUser = (req, res) => {
    const { id } = req.params;

    User.update({ _id: id }, req.body, error => {
        if (error)
            return res.status(500).json({
                status: "error",
                message: "Ha ocurrido un error",
                data: null
            });

        return res.status(200).json({
            status: "success",
            message: "Deleted user",
            data: null
        });
    });
};

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.deleteOne({ _id: id }, error => {
        console.log(error);

        return res.status(200).json({
            status: "success",
            message: "Deleted user",
            data: null
        });
    });
};

module.exports.deleteAllUsers = (_, res) => {
    User.deleteMany({}, error => {
        if (error)
            return res.status(500).json({
                status: "error",
                message: error._message,
                data: error
            });
        return res.status(200).json({
            status: "success",
            message: "Deleted all users",
            data: null
        });
    });
};
