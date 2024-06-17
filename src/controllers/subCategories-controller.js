const subCategoriesService = require("../service/subCategories-service");


class SubCategoriesController {
    async create(req, res, next) {
        try {
            const { name, categoryId } = req.body;
            const data = await subCategoriesService.create(name, categoryId);

            return res.json({ status: 201, message: 'Sub Kategoriya yaratildi', data: data })
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { name } = req.body;
            const data = await subCategoriesService.update(req.params.id, name);

            return res.json({ status: 200, message: 'Sub Kategoriya yangilandi', data: data })
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const data = await subCategoriesService.delete(req.params.id);
            return res.json({ status: 200, message: 'Sub kategoriya ochirildi', data: data });
        } catch (error) {
            next(error)
        }
    }

    async all(req, res, next) {
        try {
            const { page, limit } = req.query;
            const data = await subCategoriesService.all(page, limit);

            return res.json({ status: 200, message: 'Barcha sub-kategoriyalar', data: data })
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const data = await subCategoriesService.get(req.params.id);
            return res.json({ status: 200, message: 'Sub-kategoriya topildi', data: data })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new SubCategoriesController();