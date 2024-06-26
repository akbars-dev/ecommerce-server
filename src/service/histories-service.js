const historiesModel = require('../models/histories-model.js');


class HistoriesService {
    async getHistories() {
      const histories = await historiesModel.find({});
      return histories;
    }
}


module.exports = new HistoriesService();