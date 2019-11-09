import Event from "../models/event";

module.exports.getId = (req, res) => {
  Event.find({ name: req.params.name }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createEvent = (req, res) => {
  let newEvent = new Event({
    name: req.body.name,
    amount_of_people: req.body.amount_of_people,
    reservation: req.body.reservation
  });

  newEvent
    .save()
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateEvent = (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, event) => {
      if (err) return res.status(500).send(err);
      return res.send(event);
    }
  );
};

module.exports.deleteEvent = (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err, event) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Event successfully deleted",
      id: event._id
    };
    return res.status(200).send(response);
  });
};
