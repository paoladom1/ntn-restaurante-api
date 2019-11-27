import mongoose from 'mongoose';
import Food from './food';

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: {
            type: String,
            required: true,
            enum: ['IN PROGRESS', 'ACCEPTED', 'DELIVERED', 'CANCELED'],
            default: 'IN PROGRESS',
        },
        date: { type: Date, default: Date.now() },
        products: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
            required: true,
        },
        subtotal: { type: Number },
        total: { type: Number },
    },
    {
        timestamps: true,
    }
);

OrderSchema.pre('save', function(next) {
    const order = this;

    Food.find({ _id: { $in: order.products } }, (error, foods) => {
        if (error) return next(error);

        console.log(foods);

        const subtotal = foods.reduce(
            (accumulator, { price }) => accumulator + price,
            0
        );

        const total = subtotal + subtotal * 0.13;

        order.subtotal = Number(subtotal).toFixed(2);
        order.total = Number(total).toFixed(2);

        console.log(`subtotal: ${subtotal}`);
        next();
    });
});

module.exports = mongoose.model('Order', OrderSchema);
