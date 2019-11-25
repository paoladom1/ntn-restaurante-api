import User from "../models/user";
import Order from "../models/order";
import Food from "../models/food";

import { JWT_KEY } from "../../config";

module.exports.getUserOrders = (req, res) => {
    try {
         const token = req.header("Authorization")
             ? req.header("Authorization").replace("Bearer ", "")
             : null;
         if (token === null)
             return res.status(400).json({
                 status: "unauthenticated",
                 message:
                     "No se agrego el token de autenticacion en la peticion",
                 data: null
             });

         const data = jwt.verify(token, JWT_KEY);
         console.log(data);

        Order.find({client: data._id})

    } catch(err){
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err,
            data: err
        })
    }
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
