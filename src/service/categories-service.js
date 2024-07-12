const ApiError = require("../errors/api-error");
const categoriesModel = require("../models/categories-model");
const subCateogriesModel = require("../models/subCateogries-model");
const productsModel = require("../models/product-model");



class CategoriesService {
    async create(uz, ru) {
        const condidation = await categoriesModel.findOne({ uz: { name: uz.name }, ru: { name: ru.name } });
        if (condidation) throw ApiError.BadRequest('Bunday kategoriya oldin yaratilgan');
        const category = await categoriesModel.create({ uz, ru });

        return category;
    }

    async update(id, data) {
        const condidation = await categoriesModel.findByIdAndUpdate(id, data, { new: true });
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritilgan');

        return condidation;
    }

    async delete(id) {
        const condidation = await categoriesModel.findByIdAndDelete(id);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritilgan');
        await productsModel.deleteMany({ category: condidation._id });
        await subCateogriesModel.deleteMany({ category: condidation._id });


        return condidation;
    }

    async all(page, limit) {
        if (!page || !limit) {
            const categories = await categoriesModel.find({});
            return categories;
        }
        const categories = await categoriesModel.find().skip((page - 1) * limit).limit(limit);
        return categories;
    }

    async get(id) {
        const category = await categoriesModel.findById(id);
        if (!category) throw ApiError.BadRequest('Aydi xato kiritildi');

        const subCategories = await subCateogriesModel.find({ category: category._id });
        const products = await productsModel.find({ category: category._id });

        return { category, subCategories, products };
    }
}


module.exports = new CategoriesService();