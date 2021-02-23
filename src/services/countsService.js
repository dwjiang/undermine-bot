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
    
    async find(query) {
        let sequelize_query = {};
		sequelize_query.limit = Number(query.limit);
        if ('order' in query && 'orderBy' in query) {
			sequelize_query.order = [[ query.orderBy, query.order ]];
		}
        
        return await this.model.findAll(sequelize_query);
    }
    
    async incrementCount(id, timestamp) {
        let record = await this.model.findByPk(id);
        console.log(record);
        if (record == null) {
            let data = { user: id, count: 1, timestamp: timestamp };
            await this.model.create(data);
        } else {
            record.count += 1;
            record.timestamp = timestamp;
            await record.save();
        }
    }
}

module.exports = new CountsService(CountsModel(connection, Sequelize));
