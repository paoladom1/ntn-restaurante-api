import User from "../models/user";

module.exports.getUser = (req, res) => {
  User.find({}, function(err, docs) {
    console.log(docs);
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createUser = (req, res) => {
  const { name, dui, email, password, role } = req.body;
  let newUser = new User({
    name: name,
    dui: dui,
    email: email,
    password: password,
    role: role
  });

  newUser
    .save()
    .then(user => {
      const token = user.generateAuthToken();
      res.status(201).json({
        user,
        token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
};
