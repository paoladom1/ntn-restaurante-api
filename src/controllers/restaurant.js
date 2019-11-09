import Restaurant from "../models/restaurant";

module.exports.getCode = (req, res) => {
  Restaurant.find({ name: req.params.name }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createRestaurant = (req, res) => {
  let newRestaurant = new Restaurant({
    code: req.body.code,
    name: req.body.name,
    direction: req.body.direction,
    location: req.body.location,
    menu: req.body.menu
  });

  newRestaurant
    .save()
    .then(restaurant => {
      res.status(200).json(restaurant);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateRestaurant = (req, res) => {
  Restaurant.findByCodeAndUpdate(
    req.params.code,
    req.body,
    { new: true },
    (err, restaurant) => {
      if (err) return res.status(500).send(err);
      return res.send(restaurant);
    }
  );
};

module.exports.deleteRestaurant = (req, res) => {
  Restaurant.findByCodeAndRemove(req.params.id, (err, restaurant) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Restaurant successfully deleted",
      code: restaurant._code
    };
    return res.status(200).send(response);
  });
};
