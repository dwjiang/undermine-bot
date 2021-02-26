const CountsService = require("@services/countsService");
const UnderminesService = require("@services/underminesService");

module.exports = {
    description: "Show number of undermines a user has committed.",
    usage: {},
    examples: {}
};

const limit_default = 3;
const limit_minimum = 1;
const limit_maximum = 10;
module.exports.run = async (client, message, args) => {
    if (message.mentions.users.size === 0 || message.mentions.users.first().id === client.user.id) {
        return message.channel.send("You didn't tag a valid user.");
    }
    
    let limit = limit_default;
    if (args.length > 1) {
        if (isNaN(args[1])) {
            return message.reply(`invalid argument for command`);
        } else if (parseInt(args[1]) < limit_minimum || parseInt(args[1]) > limit_maximum) {
            return message.reply(`limit must be between ${limit_minimum} and ${limit_maximum}, inclusive.`);
        }
        limit = parseInt(args[1]);
    }
    
    let user = message.mentions.users.first();
    let record = await CountsService.pk(user.id);
    if (record == null) {
        message.channel.send({ embed: { description: `${user.tag} is not a certified underminer.` }});
    } else {        
        let leaderboard = [];
        let undermines = await UnderminesService.find(user.id, limit, "desc", "count");
        for (let undermine of undermines) {
            let underminee = await client.users.fetch(undermine.underminee);
            leaderboard.push({ user: underminee.tag, count: undermine.count, timestamp: undermine.timestamp });
        }
        while (leaderboard.length < limit)
            leaderboard.push({ user: "N/A", count: "N/A", timestamp: "N/A" });

        const medal_emojis = ["🥇", "🥈", "🥉"];
        let msg = ``;
        leaderboard.forEach((underminee, i) => {
            let emoji = i < medal_emojis.length ? medal_emojis[i] : "🏅";
            msg += `${emoji} ${underminee.user} has been undermined by this user ${underminee.count} time(s).\n`;
        });
        message.channel.send({ embed: {
            description: `${user.tag} has undermined ${record.count} person(s). The last time this user undermined was ${record.timestamp}.`,
            fields: [
                {
                    name: `The top ${limit} person(s) undermined by ${user.tag}`,
                    value: msg
                }
            ]
        }});
    }
};
