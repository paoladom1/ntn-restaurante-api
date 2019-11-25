import Event from "../models/event";

module.exports.findById = (req, res) => {
    const { id } = req.params;

    Event.findById(id, function(err, docs) {
        if (err)
            return res.status.json({
                status: "failed",
                message: err,
                data: null
            });
        else
            return res.status(200).json({
                status: "success",
                message: "events fetched",
                data: docs
            });
    });
};

module.exports.find = (_, res) => {
    Event.find({}, function(err, docs) {
        if (err)
            return res.status.json({
                status: "failed",
                message: err,
                data: null
            });
        else
            return res.status(200).json({
                status: "success",
                message: "events fetched",
                data: docs
            });
    });
};

module.exports.createEvent = (req, res) => {
    const { client, phone, amount_of_people, date } = req.body;

    try {
        const event = new Event({
            client,
            phone,
            amount_of_people,
            date
        });

        event
            .save()
            .then(event => {
                res.status(201).json({
                    status: "success",
                    message: "event created",
                    data: { event }
                });
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({
                    status: "failed",
                    message: "couldnt create event",
                    data: null
                });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};

module.exports.updateOneEvent = (req, res) => {
    const { id } = req.params;

    Event.updateOneEvent({ _id: id }, req.body, (err, doc) => {
        if (err)
            return res.status(400).json({
                status: "failed",
                message: "there was an error",
                data: null
            });
        return res.status(200).json({
            status: "success",
            message: "event updated",
            data: { doc }
        });
    });
};

module.exports.deleteOneEvent = (req, res) => {
    const { id } = req.params;

    Event.deleteOne({ _id: id }, error => {
        if (error)
            return res.status(400).json({
                status: "failed",
                message: "there was an error",
                data: null
            });
        return res.status(200).json({
            status: "success",
            message: "Deleted event",
            data: null
        });
    });
};
