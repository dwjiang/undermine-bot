const Sequelize = require('sequelize');

const Service = require('@services/service');
const UnderminesModel = require("@models/undermines");
const connection = require('@config/connection');
const config = require('@config/config');

class UnderminesService extends Service {
    constructor(model) {
        super(model);
        this.find = this.find.bind(this);
        this.incrementCount = this.incrementCount.bind(this);
    }
    
    async find(underminer, limit, order=null, orderBy=null) {
        let sequelize_query = { where: { underminer: underminer }, limit: Number(limit) };
        if (order != null && orderBy != null) {
			sequelize_query.order = [[ orderBy, order ]];
		}
        
        return await this.model.findAll(sequelize_query);
    }
    
    async incrementCount(underminer, underminee, timestamp) {
        let sequelize_query = { where: { underminer: underminer, underminee: underminee }};
        let record = await this.model.findOne(sequelize_query);
        if (record == null) {
            let data = { underminer: underminer, underminee: underminee, count: 1, timestamp: timestamp };
            await this.model.create(data);
        } else {
            record.count += 1;
            record.timestamp = timestamp;
            await record.save();
        }
    }
}

module.exports = new UnderminesService(UnderminesModel(connection, Sequelize));
