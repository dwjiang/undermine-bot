const CountsService = require('@services/countsService');
const MetricsService = require('@services/metricsService');
const utils = require("@utils/utils");

module.exports = {
    description: "Use this command tag a person who has undermined",
    usage: {},
    examples: {}
};

module.exports.run = async (client, message, args) => {
    if (message.mentions.users.size === 0 || message.mentions.users.first().id === client.user.id) {
        return message.channel.send("You didn't tag a valid user.");
    }
    
    let user = message.mentions.users.first();
    let current_timestamp = utils.getLocalDateTime();
    await CountsService.incrementCount(user.id, current_timestamp);
    let record = await CountsService.pk(user.id);
    console.log(record);
    if (record != null) {
        message.channel.send(`Attention: ${user.tag} has undermined. This user has undermined a total of ${record.count} time(s).`);
    } else {
        throw new Error("Error fetching record");
    }
    
    await MetricsService.updateMetrics(user.id, record.count, current_timestamp);
};
