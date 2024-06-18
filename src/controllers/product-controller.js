const productService = require('../service/products-service')

class ProductController {
    async create(req, res, next) {
        try {
            const { name, description, price, category, subCategory } = req.body;
            const { filename } = req.file;

            const product = await productService.create(name, description, filename, price, category, subCategory);
            return res.json({ status: 201, message: 'Mahsulot yaratildi', data: product });
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const product = await productService.update(req.params.id, { photo: req.file?.filename, ...req.body });
            return res.json({ status: 200, message: "Mahsulot yangilandi", data: product });
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const product = await productService.delete(req.params.id);
            return res.json({ status: 200, message: "Mahsulot o'chirildi", data: product });
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const product = await productService.get(req.params.id);
            return res.json({ status: 200, message: "Mahsulot topildi", data: product });
        } catch (error) {
            next(error);
        }
    }

    async all(req, res, next) {
        try {
            const { page, limit, type, id } = req.query;
            const products = await productService.all(page, limit, { type, id });

            return res.json({ status: 200, message: "Barcha mahsulotlar", data: products });
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new ProductController();