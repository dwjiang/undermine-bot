const Sequelize = require('sequelize');

const Service = require('@services/service');
const CountsModel = require("@models/counts");
const connection = require('@config/connection');
const config = require('@config/config');

class CountsService extends Service {
    constructor(model) {
        super(model);
        this.find = this.find.bind(this);
        this.incrementCount = this.incrementCount.bind(this);
    }
    
    async find(limit, order=null, orderBy=null) {
        let sequelize_query = { limit: Number(limit) };
        if (order != null && orderBy != null) {
			sequelize_query.order = [[ orderBy, order ]];
		}
        
        return await this.model.findAll(sequelize_query);
    }
    
    async incrementCount(id, amount, timestamp) {
        let record = await this.model.findByPk(id);
        if (record == null) {
            let data = { user: id, count: amount, timestamp: timestamp };
            await this.model.create(data);
        } else {
            record.count += amount;
            record.timestamp = timestamp;
            await record.save();
        }
    }
}

module.exports = new CountsService(CountsModel(connection, Sequelize));
