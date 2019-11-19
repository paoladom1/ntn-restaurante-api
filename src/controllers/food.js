import Food from "../models/food";

module.exports.getFood = (req, res) => {
    Food.find({}, (error, docs) => {
        if (error)
            return res.status.json({
                status: "failed",
                message: error,
                data: null
            });
        else
            return res.status(200).json({
                status: "success",
                count: docs.length,
                message: `${docs.length} foods fetched`,
                data: docs
            });
    });
};

module.exports.getFoodByCategory = (req, res) => {
    const { category } = req.params;

    Food.find({ category: category.toUpperCase() }, (err, docs) => {
        if (err)
            return res.status(400).json({
                status: "failed",
                message: err,
                data: null
            });
        else
            return res.status(200).json({
                status: "success",
                count: docs.length,
                message: `${docs.length} foods fetched`,
                data: docs
            });
    });
};

module.exports.createFood = (req, res) => {
    const { category, name, description, price } = req.body;

    try {
        const food = new Food({
            category,
            name,
            description,
            price
        });

        food.save()
            .then(food => {
                res.status(201).json({
                    status: "success",
                    message: "food created",
                    data: { food }
                });
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({
                    status: "failed",
                    message: "couldnt create food",
                    data: null
                });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};

module.exports.updateOneFood = (req, res) => {
    const { id } = req.params;

    Food.update({ _id: id }, req.body, (err, doc) => {
        if (err)
            return res.status(400).json({
                status: "failed",
                message: "there was an error",
                data: null
            });
        return res.status(200).json({
            status: "success",
            message: "food updated",
            data: { doc }
        });
    });
};

module.exports.updateManyFood = (req, res) => {
    const { filter, update } = req.body;

    Food.update(filter, update, { upsert: true }, (err, doc) => {
        if (err)
            return res.status(400).json({
                status: "failed",
                message: "there was an error",
                data: null
            });
        return res.status(200).json({
            status: "success",
            message: "food updated",
            data: { doc }
        });
    });
};

module.exports.deleteOneFood = (req, res) => {
    const { id } = req.params;

    Food.deleteOne({ _id: id }, error => {
        res.status(200).json({
            status: "success",
            message: "Deleted food",
            data: null
        });
    });
};

module.exports.deleteManyFood = (req, res) => {
    const { filter } = req.body;

    Food.deleteMany(filter, error => {
        res.status(200).json({
            status: "success",
            message: "Deleted food",
            data: null
        });
    });
};
