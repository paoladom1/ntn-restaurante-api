import Order from "../models/order";
import Food from "../models/food";

module.exports.getOrders = (req, res) => {
    Order.find({}, function(err, docs) {
        if (err)
            return res
                .status(500)
                .json({ status: "error", message: err._message, data: err });
        else
            return res
                .status(200)
                .json({
                    status: "success",
                    message: "orders retrieved",
                    data: docs
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
    const { status, products, subtotal, total } = req.body;

    Food.find({ _id: { $in: products } }, (err, foodList) => {
        if (err)
            return res.status(500).json({
                status: "error",
                message: err._message,
                data: err
            });
        const newOrder = new Order({
            status,
            products: foodList,
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
    Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, Order) => {
            if (err) return res.status(500).send(err);
            return res.send(Order);
        }
    );
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
