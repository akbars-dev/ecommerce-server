const analiyticsService = require('../service/analiytics-service.js');
const path = require('path');
const fs = require('fs');
const ExcelJS = require('exceljs');

class AnaliyticsController {
    async top (req, res, next) {
        try {
            const data = await analiyticsService.top();
            return res.json({ status: 200, message: 'Statistika shu yerda', data: data })
        } catch (e) {
            next(e);
        }
    }
    
    async getTopCostumersExcel(req, res, next) {
        try {
            const data = await analiyticsService.top();
            
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Top Costumers');
            
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },    
                { header: 'Ismi', key: 'name', width: 20 },    
                { header: 'Familiyasi', key: 'lastName', width: 20 },    
                { header: 'Telefon raqami', key: 'telephone', width: 20 },    
                { header: 'Tili', key: 'lang', width: 10 },    
                { header: 'Tugilgan sanasi', key: 'birthdayDate', width: 20 },    
                { header: 'Buyurtmalar soni', key: 'ordersCount', width: 20 },    
            ];
            
            console.log(data);
            data.topCustomers.forEach((val, index) => {
                worksheet.addRow({
                    id: index+1,
                    name: val.firstName,
                    lastName: val.lastName,
                    telephone: val.telephone,
                    lang: val.lang,
                    birthdayDate: val.birthdayDate,
                    ordersCount: val.ordersCount
                });
            })
            
            res.setHeader('Content-Disposition', `attachment; filename=topCostumers.xlsx`);
            res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            
            
        await workbook.xlsx.write(res);

        return res.end();
        } catch(e) {
            next(e);
        }
    }

    async getTopProductsExcel(req, res, next) {
        try {
            const data = await analiyticsService.top();
            
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Top Products');
            
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },    
                { header: 'Mahsulot nomi', key: 'name', width: 20 },    
                { header: 'Mahsulot narxi', key: 'price', width: 20 },    
                { header: 'Sotuvlar soni', key: 'ordersCount', width: 20 },    
            ];
            
            console.log(data);
            data.topProducts.forEach((val, index) => {
                worksheet.addRow({
                    id: index+1,
                    name: val.name,
                    price: val.price,
                    ordersCount: val.ordersCount,
                });
            })
            
            res.setHeader('Content-Disposition', `attachment; filename=topProducts.xlsx`);
            res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            
            
        await workbook.xlsx.write(res);

        return res.end();
        } catch(e) {
            next(e);
        }
    }
    
    async getUserExel(req, res, next){
        try {
            const data = await analiyticsService.getUserExcel();
            const filePath = path.join(__dirname, '../', '../', 'public', 'users.xlsx');
            const fileName = 'users.xlsx';
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('users sheet');
            
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },    
                { header: 'Ismi', key: 'name', width: 20 },    
                { header: 'Familiyasi', key: 'lastName', width: 20 },    
                { header: 'Telefon raqami', key: 'telephone', width: 20 },    
                { header: 'Tili', key: 'lang', width: 10 },    
                { header: 'Tugilgan sanasi', key: 'birthdayDate', width: 20 },    
                { header: 'Cashback ID', key: 'cashback_id', width: 30 },    
                { header: 'Cashback ball', key: 'cashback_ball', width: 20 },    
            ]
            
            data.forEach((val, index) => {
                worksheet.addRow({
                    id: index+1,
                    name: val.firstName,
                    lastName: val.lastName,
                    telephone: val.telephone,
                    lang: val.lang,
                    birthdayDate: val.birthdayDate,
                    cashback_id: val.cashback.barCode,
                    cashback_ball: val.cashback.balance
                })
            })
            
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            
            await workbook.xlsx.write(res);
            res.end();
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AnaliyticsController();