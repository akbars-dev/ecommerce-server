const analiyticsService = require('../service/analiytics-service.js');
const path = require('path');
const fs = require('fs');
const EcxelJS = require('exceljs')

class AnaliyticsController {
    async top (req, res, next) {
        try {
            const data = await analiyticsService.top();
            return res.json({ status: 200, message: 'Statistika shu yerda' })
        } catch (e) {
            next(e);
        }
    }
    
    async getUserExel(req, res, next){
        try {
            const data = await analiyticsService.getUserExel();
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