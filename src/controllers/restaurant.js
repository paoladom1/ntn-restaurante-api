import Restaurant from '../models/restaurant';
import Location from '../models/location';
import Food from '../models/food';

module.exports.getRestaurants = (req, res) => {
    const { filter } = req.body;

    Restaurant.find(filter, function(err, restaurants) {
        if (err)
            res.status(500).json({
                status: 'failed',
                message: 'failed to retrieve restaurants',
                data: null,
            });
        else
            res.status(200).json({
                status: 'success',
                message: 'restaurants retrieved',
                data: restaurants,
            });
    });
};

module.exports.createRestaurant = (req, res) => {
    const { name, phone, locations, menu } = req.body;

    Location.find(
        {
            _id: { $in: locations },
        },
        (error, locationsList) => {
            console.log('locations: ', locationsList);
            if (error)
                return res.status(500).json({
                    status: 'failed',
                    message: 'error ocurred',
                    data: null,
                });

            Food.find({ _id: { $in: menu } }, (error, foodList) => {
                console.log('food: ', foodList);
                if (error)
                    return res.status(500).json({
                        status: 'failed',
                        message: 'error ocurred',
                        data: null,
                    });

                const restaurant = new Restaurant({
                    name,
                    phone,
                });

                locationsList.map(location =>
                    restaurant.locations.push(location)
                );
                foodList.map(food => restaurant.menu.push(food));

                restaurant.save().then(restaurant => {
                    return res.status(201).json({
                        status: 'success',
                        message: 'restaurant created successfully',
                        data: restaurant,
                    });
                });
            });
        }
    );
};

module.exports.updateRestaurant = (req, res) => {
    const { filter, update } = req.body;
    Restaurant.update(filter, update, { new: true }, (err, restaurant) => {
        if (err) return res.status(500).send(err);
        return res.send(restaurant);
    });
};

module.exports.deleteRestaurant = (_, res) => {
    const { id } = req.params;

    Restaurant.deleteOne({ _id: id }, (err, restaurants) => {
        if (err)
            return res.status(500).json({
                status: 'error',
                message: 'ha ocurrido un error',
                data: null,
            });

        return res.status(200).json({
            status: 'success',
            message: 'restaurante eliminado',
            data: null,
        });
    });
};

module.exports.deleteRestaurants = (req, res) => {
    const { filter } = req.body;

    Restaurant.deleteMany(filter, (err, restaurants) => {
        if (err) return res.status(500).send(err);
        const response = {
            msg: 'Restaurant successfully deleted',
            code: restaurants,
        };
        return res.status(200).send(response);
    });
};
