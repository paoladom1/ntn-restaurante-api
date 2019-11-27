import mongoose, { models } from 'mongoose';
import Food from '../models/food';
import Location from '../models/location';

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
    {
        name: String,
        phone: String,
        locations: [Location.schema],
        menu: [Food.schema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
