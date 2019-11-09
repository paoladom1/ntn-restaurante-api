import Client from "../models/client";

module.exports.getId = (req, res) => {
  Client.find({ Name: req.params.Name }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.getClients = (req, res) => {
  Client.find({}, (err, docs) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createClient = (req, res) => {
  let insertClient = new Client({
    name: req.body.name,
    email: req.body.email,
    dui: req.body.dui
  });
  insertClient
    .save()
    .then(newclient => {
      res.status(200).json(newclient);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateClient = (req, res) => {
  Client.findByIdAndUpdate(
    req.params.clientId,
    req.body,
    { new: true },
    (err, client) => {
      if (err) return res.status(500).send(err);
      return res.send(client);
    }
  );
};

module.exports.deleteClient = (req, res) => {
  Client.findByIdAndRemove(req.params.clientId, (err, client) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Client successfully deleted",
      id: client._id
    };
    return res.status(200).send(response);
  });
};
