import Count from "../models/count";

module.exports.getId = (req, res) => {
  Count.find({ username: req.params.username }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.getCount = (req, res) => {
  Count.find({}, (err, docs) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createCount = (req, res) => {
  let newCount = new Count({
    username: req.body.username,
    password: req.body.password
  });
  
  newCount
    .save()
    .then(Count => {
      res.status(200).json(Count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateCount = (req, res) => {
  Count.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, Count) => {
      if (err) return res.status(500).send(err);
      return res.send(Count);
    }
  );
};

module.exports.deleteCount = (req, res) => {
  Count.findByIdAndRemove(req.params.id, (err, Count) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Count successfully deleted",
      id: Count._id
    };
    return res.status(200).send(response);
  });
};