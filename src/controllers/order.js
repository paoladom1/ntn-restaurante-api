import Order from "../models/order";

module.exports.getId = (req, res) => {
  Order.find({ client: req.params.client }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.getOrder = (req, res) => {
  Order.find({}, (err, docs) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createOrder = (req, res) => {
  let newOrder = new Order({
    client: req.body.client,
    employee: req.body.employee,
    food: req.body.food,
    subtotal: req.body.subtotal,
    total: req.body.total
  });
  
  newOrder
    .save()
    .then(Order => {
      res.status(200).json(Order);
    })
    .catch(err => {
      res.status(500).json(err);
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

module.exports.deleteOrder = (req, res) => {
  Order.findByIdAndRemove(req.params.id, (err, Order) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Order successfully deleted",
      id: Order._id
    };
    return res.status(200).send(response);
  });
};
