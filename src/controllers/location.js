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
    const { address, city, department } = req.body;

    let newLocation = new Location({
        address: address,
        city: city,
        department: department
    });

    newLocation
        .save()
        .then(location => {
            res.status(200).json({
                status: "success",
                message: "location created",
                data: { location }
            });
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
