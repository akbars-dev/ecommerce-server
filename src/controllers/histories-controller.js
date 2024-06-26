const historiesService = require('../service/histories-service.js');

class HistoriesController{
    async all (req, res, next) {
        try {
            const data = await  historiesService.getHistories();
            return res.json({ staus: 200, message: "Tarix", data: data });
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new HistoriesController();