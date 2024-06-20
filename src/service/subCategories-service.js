const ApiError = require("../errors/api-error");
const subCateogriesModel = require("../models/subCateogries-model");


class SubCategoriesService {
    async create(uz, ru, categoryId) {
        const condidation = await subCateogriesModel.findOne({ uz: { name: uz.name.trim() }, ru: { name: ru.name.trim() } });
        if (condidation) throw ApiError.BadRequest('Bunday sub kategoriya avval bor edi');
        const subCategory = await subCateogriesModel.create({ uz, ru, category: categoryId });

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
        if (!page || !limit) {
            const subCategories = await subCateogriesModel.find({});
            return subCategories;
        }
        const subCategories = await subCateogriesModel.find().skip((page - 1) * limit).limit(limit);
        return subCategories;
    }

    async get(id) {
        const subCategory = await subCateogriesModel.findById(id);
        if (!subCategory) throw ApiError.BadRequest('Aydi xato kiritildi');

        const products = await productsModel.find({ subCategory: subCategory._id });


        return { subCategory, products };
    }
}


module.exports = new SubCategoriesService();