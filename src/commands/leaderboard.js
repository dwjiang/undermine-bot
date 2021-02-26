const CountsService = require('@services/countsService');

module.exports = {
    description: "Show number of undermines a user has committed.",
    usage: {},
    examples: {}
};

const limit_default = 5;
const limit_minimum = 1;
const limit_maximum = 20;

module.exports.run = async (client, message, args) => {
    let limit = 5;
    if (args.length > 0) {
        if (isNaN(args[0])) {
            return message.reply(`invalid argument for command`);
        } else if (parseInt(args[0]) < limit_minimum || parseInt(args[0]) > limit_maximum) {
            return message.reply(`limit must be between ${limit_minimum} and ${limit_maximum}, inclusive.`);
        }
        limit = parseInt(args[0]);
    }
    
    let leaderboard = [];
    let records = await CountsService.find({ limit: limit, order: "desc", orderBy: "count" });
    for (let record of records) {
        let user = await client.users.fetch(record.user);
        leaderboard.push({ user: user.tag, count: record.count });
    }
    while (leaderboard.length < limit)
        leaderboard.push({ user: "N/A", count: "N/A" });
    
    const medal_emojis = ["🥇", "🥈", "🥉"];
    let msg = { title: `The top ${limit} underminer(s)\n\n`, description: `` };
    leaderboard.forEach((user, i) => {
        let emoji = i < medal_emojis.length ? medal_emojis[i] : "🏅";
        msg.description += `${emoji} ${user.user} with ${user.count} person(s) undermined\n`;
    });
    message.channel.send({ embed: msg });
};
