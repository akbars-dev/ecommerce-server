const discountModel = require("../models/discount-model");
const ApiError = require('../errors/api-error');
const fs = require('fs');
const path = require('path');

class DiscountService {
    async create(name, description, price, photoPath) {
        const condidation = await discountModel.findOne({ name: name });
        if (condidation) throw ApiError.BadRequest('Bunday aksiya oldin yaratilgan');

        const discount = await discountModel.create({ name, description, price, photoPath });
        return discount
    }

    async update(id, data) {
        const condidation = await discountModel.findByIdAndUpdate(id, data);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi'); 
        if (data.photoPath) {
            await fs.unlink(path.join(__dirname, '../', '../', 'public', condidation.photo), (err) => {if(err) console.log(err)});
        }

        return condidation
    }

    async delete(id) {
        const condidation = await discountModel.findByIdAndDelete(id);
        if (!condidation) throw ApiError.BadRequest('Aydi xato kiritildi'); 
        return condidation
    }

    async all(page, limit) {
        const discounts = discountModel.find({}).skip((page - 1) * limit).limit(limit);
        return discounts
    }
}

module.exports = new DiscountService();