const discountService = require('../service/discount-service'); 

class DiscountController {
    async create(req, res, next) {
        try {
            const { name, description, price } = req.body;
            const photoPath = req.file.filename;

            const data = await discountService.create(name, description, price, photoPath);
            return res.json({ status: 201, message: "Aksiya yaratildi", data: data });
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { name, description, price } = req.body;
            const photoPath = req.file?.filename;
            
            const data = await discountService.update(req.params.id, { name, description, price, photoPath });
            return res.json({ status: 200, message: "Aksiya yangilandi", data: data });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const data = await discountService.delete(req.params.id);
            return res.json({ satatus: 200, message:"Aksiya o'chirildi", data: data });
        } catch (error) {
            next(error);
        }
    }

    async all (req, res, next) {
        try {
            const data = await discountService.all(req.query.page, req.query.limit);
            return res.json({ status: 200, message: "Barcha aksiyalar", data: data });
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new DiscountController();