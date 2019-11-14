import Food from "../models/food";

module.exports.getFood = (req, res) => {
  const { filter } = req.body;

  Food.find(filter, (err, docs) => {
    if (err)
      res.status(400).json({ status: "failed", message: err, data: null });
    else
      res.status(200).json({
        status: "success",
        count: docs.length,
        message: `${docs.length} foods fetched`,
        data: docs
      });
  });
};

module.exports.createFood = (req, res) => {
  const { name, description, price } = req.body;

  try {
    const food = new Food({
      name,
      description,
      price
    });

    food
      .save()
      .then(food => {
        res
          .status(201)
          .json({ status: "success", message: "food created", data: { food } });
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({
            status: "failed",
            message: "couldnt create food",
            data: null
          });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

module.exports.updateFood = (req, res) => {
  const { filter, update } = req.body;

  Food.findOneAndUpdate(filter, update, { upsert: true }, (err, doc) => {
    if (err) return res.status(400).json({ status: "failed", message: "there was an error", data: null });
    return res.status(200).json({ status: "success", message: "food updated", data: { doc } });
  })
}

module.exports.deleteFood = (req, res) => {
  const { filter } = req.body;
  Food.deleteMany(filter, error => {
    console.log(error);
    res
      .status(200)
      .json({ status: "success", message: "Deleted food", data: null });
  });
};
