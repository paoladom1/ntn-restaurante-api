import Menu from "../models/menu";

module.exports.getId = (req, res) => {
    Menu.find({ menu: req.params.menu }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.getMenu = (req, res) => {
  Menu.find({}, (err, docs) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createMenu = (req, res) => {
  let newMenu = new Menu({
    entry: req.body.entry,
    breakfast: req.body.breakfast,
    lounch: req.body.lounch,
    dessert: req.body.dessert,
    drinks: req.body.drinks,
    price: req.body.price
  });
  
  newMenu
    .save()
    .then(Menu => {
      res.status(200).json(Menu);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateMenu = (req, res) => {
  Menu.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, Menu) => {
      if (err) return res.status(500).send(err);
      return res.send(Menu);
    }
  );
};

module.exports.deleteMenu = (req, res) => {
  Menu.findByIdAndRemove(req.params.id, (err, Menu) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Menu successfully deleted",
      id: Menu._id
    };
    return res.status(200).send(response);
  });
};