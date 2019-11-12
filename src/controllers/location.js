import Location from "../models/location";

module.exports.getId = (req, res) => {
  Location.find({ city: req.params.city }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.getLocation = (req, res) => {
  Location.find({}, (err, docs) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createLocation = (req, res) => {
  let newLocation = new Location({
    direction: req.body.direction,
    city: req.body.city,
    departament: req.body.departament
  });
  
  newLocation
    .save()
    .then(Location => {
      res.status(200).json(Location);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateLocation = (req, res) => {
  Location.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, location) => {
      if (err) return res.status(500).send(err);
      return res.send(location);
    }
  );
};

module.exports.deleteLocation = (req, res) => {
  Location.findByIdAndRemove(req.params.id, (err, Location) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Location successfully deleted",
      id: Location._id
    };
    return res.status(200).send(response);
  });
};