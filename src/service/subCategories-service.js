const ApiError = require("../errors/api-error");
const productModel = require("../models/product-model");
const subCateogriesModel = require("../models/subCateogries-model");


class SubCategoriesService {
    async create(uz, ru, categoryId) {
        const condidation = await subCateogriesModel.findOne({ uz: { name: uz.name.trim() }, ru: { name: ru.name.trim() } });
        if (condidation) throw ApiError.BadRequest('Bunday sub kategoriya avval bor edi');
        const subCategory = await subCateogriesModel.create({ uz, ru, category: categoryId });

        return subCategory;
    }

    async update(id, data) {
        const condidation = await subCateogriesModel.findByIdAndUpdate(id, data, { new: true });
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
            const subCategories = await subCateogriesModel.find({}).populate('category');
            return subCategories;
        }
        const subCategories = await subCateogriesModel.find().skip((page - 1) * limit).limit(limit).populate('category');
        return subCategories;
    }

    async get(id) {
        const subCategory = await subCateogriesModel.findById(id);
        if (!subCategory) throw ApiError.BadRequest('Aydi xato kiritildi');

        console.log(subCategory._id);
        const products = await productModel.find({ subCategory: subCategory._id });


        return { subCategory, products };
    }
}


module.exports = new SubCategoriesService();