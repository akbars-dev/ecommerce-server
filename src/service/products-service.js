const productModel = require('../models/product-model');
const ApiError = require('../errors/api-error');
const fs = require('fs');
const path = require('path');


class ProductService {
    async create(name, description, photoPath, price, category, subCategory) {
        const condidation = await productModel.findOne({ name: name });

        if (condidation) throw ApiError.BadRequest('Bunday mahsulot oldin yaratilgan');
        const product = await productModel.create({ name, description, photo: photoPath, price, category, subCategory });

        return product;
    }

    async update(id, data) {
        const condidation = await productModel.findByIdAndUpdate(id, data);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');
        if (data.photo) {
            await fs.unlink(path.join(__dirname, '../', '../', 'public', condidation.photo), (err) => {if(err) console.log(err)});
        }


        return condidation;
    }

    async delete(id) {
        const condidation = await productModel.findByIdAndDelete(id);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');

        await fs.unlink(path.join(__dirname, '../', '../', 'public', condidation.photo), (err) => {if(err) console.log(err)});

        return condidation;
    }

    async get(id) {
        const condidation = await productModel.findById(id);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');

        return condidation;
    }

    async all(page, limit, filter) {
        if (filter.type == 'category') {
            const data = await productModel.find({ category: filter.id }).skip((page - 1) * limit).limit(limit);
            return data;
        } else if (filter.type == 'sub-category') {
            const data = await productModel.find({ subCategory: filter.id }).skip((page - 1) * limit).limit(limit);
            return data;
        } else {
            const data = await productModel.find({ }).skip((page - 1) * limit).limit(limit);
            return data;
        }
    }
}

module.exports = new ProductService();