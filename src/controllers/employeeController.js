import Employee from "../models/employee";

module.exports.getCode = (req, res) => {
  Employee.find({ name: req.params.name }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createEmployee = (req, res) => {
  let newEmployee = new Employee({
    code: req.body.code,
    name: req.body.name,
    position: req.body.Position
  });

  newEmployee
    .save()
    .then(employee => {
      res.status(200).json(employee);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateEmployee = (req, res) => {
  Employee.findByCodeAndUpdate(
    req.params.employeeCode,
    req.body,
    { new: true },
    (err, employee) => {
      if (err) return res.status(500).send(err);
      return res.send(employee);
    }
  );
};

module.exports.deleteEmployee = (req, res) => {
  Employee.findByCodeAndRemove(req.params.employeeCode, (err, employee) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Employee successfully deleted",
      code: employee._code
    };
    return res.status(200).send(response);
  });
};
