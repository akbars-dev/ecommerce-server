const ApiError = require("../errors/api-error");
const categoriesModel = require("../models/categories-model");



class CategoriesService {
    async create(name) {
        const condidation = await categoriesModel.findOne({ name: name.trim() });
        if (condidation) throw ApiError.BadRequest('Bunday kategoriya oldin yaratilgan');
        const category = await categoriesModel.create({ name: name.trim() });

        return category;
    }

    async update(id, name) {
        const condidation = await categoriesModel.findByIdAndUpdate(id, { name }, { new: true });
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritilgan');

        return condidation;
    }

    async delete(id) {
        const condidation = await categoriesModel.findByIdAndDelete(id);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritilgan');

        return condidation;
    }

    async all(page, limit) {
        const categories = await categoriesModel.find().skip((page - 1) * limit).limit(limit);

        return categories;
    }

    async get(id) {
        const category = await categoriesModel.findById(id);
        if (!category) throw ApiError.BadRequest('Aydi xato kiritildi');

        return category;
    }
}


module.exports = new CategoriesService();