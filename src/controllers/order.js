import Order from "../models/order";
import Food from "../models/food";

module.exports.getOrders = (req, res) => {
    Order.find({})
        .populate("client products")
        .exec(function(err, orders) {
            if (err)
                return res.status(500).json({
                    status: "error",
                    message: err._message,
                    data: err
                });
            else
                return res.status(200).json({
                    status: "success",
                    message: "orders retrieved",
                    data: { orders }
                });
        });
};

module.exports.getOrderById = (req, res) => {
    const { id } = req.params;

    Order.findById(id, (err, order) => {
        if (err)
            return res.status(500).json({
                status: "error",
                message: err._message,
                data: err
            });

        return res.status(200).json({
            status: "success",
            message: "order retrieved",
            data: { order }
        });
    });
};

module.exports.createOrder = (req, res) => {
    const { client, status, products, subtotal, total } = req.body;

    Food.find({ _id: { $in: products } }, (err, docs) => {
        if (err)
            return res.status(500).json({
                status: "error",
                message: err._message,
                data: err
            });

        const foods = products.map(product => {
            console.log(product);
            docs.find(doc => doc._id === product);
        });

        console.log(foods);

        const newOrder = new Order({
            client,
            status,
            products: foods,
            subtotal,
            total
        });

        newOrder
            .save()
            .then(order =>
                res.status(201).json({
                    status: "success",
                    message: "orden creada",
                    data: { order }
                })
            )
            .catch(err => {
                return res.status(500).json({
                    status: "error",
                    message: "ha ocurrido un error",
                    data: err
                });
            });
    });
};

module.exports.updateOrder = (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err)
            return res.status(500).json({
                status: "error",
                message: err,
                data: null
            });

        order.status = req.body.status;
        order
            .save()
            .then(order =>
                res.status(200).json({
                    status: "success",
                    message: "orden actualizada",
                    data: { order }
                })
            )
            .catch(error =>
                res.status(500).json({
                    status: "error",
                    message: error,
                    data: error
                })
            );
    });
};

module.exports.deleteOrders = (req, res) => {
    Order.deleteMany({}, (err, _) => {
        if (err)
            return res.status(500).json({
                status: "error",
                message: err._message,
                data: err
            });

        return res.status(200).json({
            status: "success",
            message: "orders deleted",
            data: null
        });
    });
};
