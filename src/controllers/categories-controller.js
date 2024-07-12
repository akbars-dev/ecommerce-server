const categoriesService = require("../service/categories-service");


class CategoriesController {
    async create(req, res, next) {
        try {
            const { uz, ru } = req.body;

            const category = await categoriesService.create(uz, ru);
            return res.json({ status: 201, message: 'Kategoriya yaratildi', data: category })
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const category = await categoriesService.update(req.params.id, req.body);
            return res.json({ status: 200, message: 'Kategoriya yangilandi', data: category })
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const category = await categoriesService.delete(req.params.id); 
            return res.json({ status: 200, message: 'Kategoriya ochirildi', data: category });
        } catch (error) {
            next(error);
        }
    }

    async all(req, res, next) {
        try {
            const { limit, page } = req.query;
            const categories = await categoriesService.all(page, limit);

            return res.json({status: 200, message: 'Barcha kategoriyalar', data: categories});
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const category = await categoriesService.get(req.params.id);
            return res.json({status: 200, message: `Kategoriya topildi`, data: category}); 
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CategoriesController();