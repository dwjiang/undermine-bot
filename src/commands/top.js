const CountsService = require('@services/countsService');

module.exports = {
    description: "Show number of undermines a user has committed.",
    usage: {},
    examples: {}
};

module.exports.run = async (client, message, args) => {
    let top = [];
    let records = await CountsService.find({ limit: 5, order: "desc", orderBy: "count" });
    for (let record of records) {
        let user = await client.users.fetch(record.user);
        top.push({ user: user.tag, count: record.count });
    }
    while (top.length < 5) {
        top.push({ user: "N/A", count: "N/A" });
    }
    let msg = `Here are the top 5 underminers:\n`;
    ["🥇", "🥈", "🥉", "🏅", "🏅"].forEach((emoji, i) => {
        msg += `\t${emoji} ${top[i].user} with ${top[i].count} undermine(s)\n`;
    });
    message.channel.send(msg);
};
