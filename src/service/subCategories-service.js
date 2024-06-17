const ApiError = require("../errors/api-error");
const subCateogriesModel = require("../models/subCateogries-model");


class SubCategoriesService {
    async create(name, categoryId) {
        const condidation = await subCateogriesModel.findOne({ name });
        if (condidation) throw ApiError.BadRequest('Bunday sub kategoriya avval bor edi');
        const subCategory = await subCateogriesModel.create({ name: name, category: categoryId });

        return subCategory;
    }

    async update(id, name) {
        const condidation = await subCateogriesModel.findByIdAndUpdate(id, { name: name }, { new: true });
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');

        return condidation;
    }

    async delete(id) {
        const condidation = await subCateogriesModel.findByIdAndDelete(id);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');

        return condidation;
    }

    async all(page, limit) {
        const subCategories = await subCateogriesModel.find().skip((page - 1) * limit).limit(limit);
        return subCategories;
    }

    async get(id) {
        const subCategory = await subCateogriesModel.findById(id);
        if (!subCategory) throw ApiError.BadRequest('Aydi xato kiritildi');

        return subCategory;
    }
}


module.exports = new SubCategoriesService();