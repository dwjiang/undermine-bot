class Service {
    constructor(model) {
        this.model = model;
        this.pk = this.pk.bind(this);
        this.findOne = this.findOne.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
    }
    
    async pk(id) {
        return await this.model.findByPk(id);
    }
    
    async findOne(query) {
        return await this.model.findOne(query);
    }
    
    async insert(data) {
        return await this.model.create(data);
    }
    
    async update(record_or_id, data) {
        let record;
        if (record_or_id instanceof this.model) {
            record = record_or_id;
        } else {
            let id = record_or_id;
            record = await this.pk(id);
        }
        
        if (!record)
            throw new Error("Record not found");
        return await record.update(data);
    }
}

module.exports = Service;
