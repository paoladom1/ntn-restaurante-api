import jwt from 'jsonwebtoken';
import moment from 'moment';

import Order from '../models/order';
import Event from '../models/event';
import { JWT_KEY } from '../config';

module.exports.getMyOrders = (req, res) => {
    try {
        const token = req.header('Authorization')
            ? req.header('Authorization').replace('Bearer ', '')
            : null;
        if (token === null)
            return res.status(400).json({
                status: 'unauthenticated',
                message:
                    'No se agrego el token de autenticacion en la peticion',
                data: null,
            });

        const data = jwt.verify(token, JWT_KEY);

        Order.find({ client: data._id })
            .populate('products')
            .sort({ date: 'desc' })
            .exec((error, orders) => {
                if (error)
                    return res.status(500).json({
                        status: 'error',
                        message: error,
                        data: error,
                    });

                return res.status(200).json({
                    status: 'success',
                    message: 'ordenes encontradas',
                    data: { orders },
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            message: err,
            data: err,
        });
    }
};

module.exports.createMyOrder = (req, res) => {
    const { products } = req.body;

    try {
        const token = req.header('Authorization')
            ? req.header('Authorization').replace('Bearer ', '')
            : null;
        if (token === null)
            return res.status(400).json({
                status: 'unauthenticated',
                message:
                    'No se agrego el token de autenticacion en la peticion',
                data: null,
            });

        const data = jwt.verify(token, JWT_KEY);

        const newOrder = new Order({
            client: data._id,
            products,
        });

        newOrder
            .save()
            .then(order => {
                return res.status(200).json({
                    status: 'success',
                    message: 'orden creada',
                    data: { order },
                });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    status: 'error',
                    message: err,
                    data: err,
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: error,
            data: error,
        });
    }
};

module.exports.createMyEvent = (req, res) => {
    const { phone, amount_of_people, date } = req.body;

    try {
        const token = req.header('Authorization')
            ? req.header('Authorization').replace('Bearer ', '')
            : null;
        if (token === null)
            return res.status(400).json({
                status: 'unauthenticated',
                message:
                    'No se agrego el token de autenticacion en la peticion',
                data: null,
            });

        const data = jwt.verify(token, JWT_KEY);
        const newDate = moment(date).startOf('day');

        Event.find({
            client: data._id,
            date: {
                $gte: newDate.toDate(),
                $lte: moment(newDate)
                    .endOf('day')
                    .toDate(),
            },
        })
            .then(docs => {
                if (docs.length === 0) {
                    const event = new Event({
                        client: data._id,
                        phone,
                        amount_of_people,
                        date,
                    });

                    event
                        .save()
                        .then(event => {
                            res.status(201).json({
                                status: 'success',
                                message: 'Evento creado exitosamente',
                                data: { event },
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(400).json({
                                status: 'failed',
                                message: 'No se pudo crear el evento',
                                data: null,
                            });
                        });
                } else {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Ya existe una reserva este dia',
                        data: null,
                    });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({
                    status: 'failed',
                    message: 'couldnt create event',
                    data: null,
                });
            });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'couldnt create event',
            data: null,
        });
    }
};

module.exports.findMyEvents = (req, res) => {
    try {
        const token = req.header('Authorization')
            ? req.header('Authorization').replace('Bearer ', '')
            : null;
        if (token === null)
            return res.status(400).json({
                status: 'unauthenticated',
                message:
                    'No se agrego el token de autenticacion en la peticion',
                data: null,
            });

        const data = jwt.verify(token, JWT_KEY);

        Event.find({ client: data._id })
            .populate('client', 'name')
            .sort({ date: 'desc' })
            .exec((err, events) => {
                if (err)
                    return res.status.json({
                        status: 'failed',
                        message: err,
                        data: null,
                    });
                else
                    return res.status(200).json({
                        status: 'success',
                        message: 'events fetched',
                        data: { events },
                    });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};
