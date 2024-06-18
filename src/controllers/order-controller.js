const orderService = require("../service/order-service");


class OrderController {
    async create(req, res, next) {
        try {
            const { price, products, userId } = req.body;

            const order = await orderService.create(products, userId, price);
            return res.json({ status: 200, message: "Buyurtma muofaqiyatli yaratildi", data: order });
        } catch (error) {
            next(error);
        }
    }

    async getByAuthor(req, res, next) {
        try {
            const orders = await orderService.getByAuthor(req.params.id);
            return res.json({ status: 200, message: "Userga tegishli buyurtmalar yaratildi", data: orders })
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const order = await orderService.get(req.params.id);
            return res.json({ status: 200, message: "Buyurtma topildi", data: order })
        } catch (error) {
            next(error)
        }
    }

    async all(req, res, next) {
        try {
            const orders = await orderService.all(req.query.page, req.query.limit);
            return res.json({ status: 200, message: "Barcha buyurtmalar", data: orders });
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new OrderController();