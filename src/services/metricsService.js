const Sequelize = require('sequelize');

const Service = require('@services/service');
const MetricsModel = require("@models/metrics");
const connection = require('@config/connection');
const config = require('@config/config');
const utils = require("@utils/utils");

class MetricsService extends Service {
    constructor(model) {
        super(model);
        this.updateMetrics = this.updateMetrics.bind(this);
    }
    
    async updateMetrics(id, count, timestamp) {
        let sequelize_query = {
            where: { user: id },
            order: [[ "timestamp", "DESC" ]]
        };
        let record = await this.model.findOne(sequelize_query);
        if (record == null || !utils.isDateSame(timestamp, record.timestamp, config.options.metrics_save_interval)) {
            let data = { user: id, count: count, timestamp: timestamp };
            await this.model.create(data);
        } else {
            record.count = count;
            record.timestamp = timestamp;
            await record.save();
        }
    }
}

module.exports = new MetricsService(MetricsModel(connection, Sequelize));
