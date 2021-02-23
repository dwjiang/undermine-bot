const CountsService = require('@services/countsService');

module.exports = {
    description: "Show number of undermines a user has committed.",
    usage: {},
    examples: {}
};

module.exports.run = async (client, message, args) => {
    if (message.mentions.users.size === 0 || message.mentions.users.first().id === client.user.id) {
        return message.channel.send("You didn't tag a valid user.");
    }
    
    let user = message.mentions.users.first();
    let record = await CountsService.pk(user.id);
    if (record == null) {
        message.channel.send(`${user.tag} is not a certified underminer.`);
    } else {
        message.channel.send(`${user.tag} has undermined ${record.count} time(s). The last time this user undermined was ${record.timestamp}.`);
    }
};
