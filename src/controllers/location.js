import Location from "../models/location";

module.exports.getLocations = (req, res) => {
    const { filter } = req.body;

    Location.find(filter, function(err, docs) {
        if (err) res.status(500).json(err);
        else
            res.status(200).json({
                status: "success",
                message: "locations found",
                data: docs
            });
    });
};

module.exports.createLocation = (req, res) => {
    const { address, city, department, employees } = req.body;

    let newLocation = new Location({
        address: address,
        city: city,
        department: department,
        employees: employees,
    });

    newLocation
        .save()
        .then(location => {
            res.status(200).json({
                status: "success",
                message: "sucursal creada",
                data: { location }
            });
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: "error inesperado",
                data: null
            });
        });
};

module.exports.updateLocation = (req, res) => {
    const { filter, update } = req.body;

    Location.update(
        filter,
        update,
        { new: true },
        (err, location) => {
            if (err) return res.status(500).json({
                status: "error",
                message: "error inesperado",
                data: null
            });
            return res.status(200).json({
                status: "success",
                message: "sucursal actualizada",
                data: { location }
            });
        }
    );
};

module.exports.deleteLocation = (req, res) => {
    const { filter } = req.body;
    
    Location.deleteOne(filter, (err, location) => {
        if (err) return res.status(500).json({
            status: "error",
            message: "ha ocurrido un error",
            data: null
        });

        return res.status(200).json({
            status: "success",
            message: "location deleted",
            data: { location }
        });
    });
};
