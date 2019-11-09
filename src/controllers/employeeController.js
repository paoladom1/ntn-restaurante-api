import Employee from "../models/employee";

module.exports.getCode = (req, res) => {
  Employee.find({ Name: req.params.Name }, function(err, docs) {
    if (err) res.status(500).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.createEmployee = (req, res) => {
  let insertEmployee = new Employee({
    Code: req.body.Code,
    Name: req.body.Name,
    Position: req.body.Position
  });
  insertEmployee
    .save()
    .then(newEmployee => {
      res.status(200).json(newEmployee);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.updateEmployee = (req, res) => {
  Employee.findByCodeAndUpdate(
    req.params.EmployeeCode,
    req.body,
    { new: true },
    (err, Employee) => {
      if (err) return res.status(500).send(err);
      return res.send(Employee);
    }
  );
};

module.exports.deleteEmployee = (req, res) => {
  Employee.findByCodeAndRemove(req.params.EmployeeCode, (err, Employee) => {
    if (err) return res.status(500).send(err);
    const response = {
      msg: "Employee successfully deleted",
      code: Employee._Code
    };
    return res.status(200).send(response);
  });
};
