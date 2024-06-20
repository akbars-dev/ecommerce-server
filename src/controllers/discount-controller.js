const discountService = require('../service/discount-service');

class DiscountController {
    async create(req, res, next) {
        try {
            const { uzName, uzDescription, ruName, ruDescription, price } = req.body;
            const photoPath = req.file.filename;

            const data = await discountService.create({ name: uzName, description: uzDescription }, { name: ruName, description: ruDescription }, price, photoPath);
            return res.json({ status: 201, message: "Aksiya yaratildi", data: data });
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { uzName, uzDescription, ruName, ruDescription, price } = req.body;
            const photoPath = req.file?.filename;

            const data = await discountService.update(req.params.id, { uz: { name: uzName, description: uzDescription }, ru: { name: ruName, description: ruDescription }, price, photoPath });
            return res.json({ status: 200, message: "Aksiya yangilandi", data: data });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const data = await discountService.delete(req.params.id);
            return res.json({ satatus: 200, message: "Aksiya o'chirildi", data: data });
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const data = await discountService.get(req.params.id);
            return res.json({ status: 200, message: "Chegirma topdildi", data: data });
        } catch (error) {
            next(error)
        }
    }

    async all(req, res, next) {
        try {
            const data = await discountService.all(req.query.page, req.query.limit);
            return res.json({ status: 200, message: "Barcha aksiyalar", data: data });
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new DiscountController();