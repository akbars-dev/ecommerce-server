const analiyticsService = require('../service/analiytics-service.js');

class AnaliyticsController {
    async top (req, res, next) {
        try {
            const data = await analiyticsService.top();
            return res.json({ status: 200, message: 'Statistika shu yerda' })
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AnaliyticsController();