const productModel = require('../models/product-model');
const ApiError = require('../errors/api-error');
const fs = require('fs');
const path = require('path');


class ProductService {
    async create(uz, ru, photoPath, price, category, subCategory) {
        const condidation = await productModel.findOne({ uz: { name: uz.name }, ru: { name: ru.name } });

        if (condidation) throw ApiError.BadRequest('Bunday mahsulot oldin yaratilgan');
        const product = await productModel.create({ ru, uz, photo: photoPath, price, category, subCategory });

        return product;
    }

    async update(id, data) {
        const condidation = await productModel.findByIdAndUpdate(id, {
            uz: { name: data.uzName, description: data.uzDescription },
            ru: { name: data.ruName, description: data.ruDescription },
            price: data.price,
            category: data.category,
            subCategory: data.subCategory,
            photo: data.photo
        });
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');
        if (data.photo) {
            await fs.unlink(path.join(__dirname, '../', '../', 'public', condidation.photo), (err) => { if (err) console.log(err) });
        }


        return condidation;
    }

    async delete(id) {
        const condidation = await productModel.findByIdAndDelete(id);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');

        await fs.unlink(path.join(__dirname, '../', '../', 'public', condidation.photo), (err) => { if (err) console.log(err) });

        return condidation;
    }

    async get(id) {
        const condidation = await productModel.findById(id).populate('category').populate('subCategory');
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi');

        return condidation;
    }

    async all(page, limit, filter) {
        if (filter.type == 'category') {
            if (!page || !limit) {
                const data = await productModel.find({})
                    .populate('category')
                    .populate('subCategory');
                return data;
            }
            const data = await productModel.find({ category: filter.id }).skip((page - 1) * limit).limit(limit).populate('category').populate('subCategory');
            return data;
        } else if (filter.type == 'sub-category') {
            if (!page || !limit) {
                const data = await productModel.find({})
                    .populate('category')
                    .populate('subCategory');;
                return data;
            }
            const data = await productModel.find({ subCategory: filter.id }).skip((page - 1) * limit).limit(limit)
                .populate('category')
                .populate('subCategory');;
            return data;
        } else {
            if (!page || !limit) {
                const data = await productModel.find({})
                    .populate('category')
                    .populate('subCategory');;
                return data;
            }
            const data = await productModel.find({}).skip((page - 1) * limit).limit(limit)
                .populate('category')
                .populate('subCategory');;
            return data;
        }
    }
}

module.exports = new ProductService();