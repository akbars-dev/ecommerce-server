const analiyticsService = require('../service/analiytics-service.js');
const path = require('path');
const fs = require('fs')

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
            
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type', 'text/plain');
            
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AnaliyticsController();