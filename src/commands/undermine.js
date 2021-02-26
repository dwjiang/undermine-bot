const CountsService = require("@services/countsService");
const MetricsService = require("@services/metricsService");
const UnderminesService = require("@services/underminesService");
const config = require("@config/config");
const utils = require("@utils/utils");

module.exports = {
    description: "Use this command tag a person who has undermined another person",
    usage: {},
    examples: {},
    cooldown: 60
};

module.exports.run = async (client, message, args) => {
    if (message.mentions.users.size === 0 || message.mentions.users.first().id === client.user.id) {
        return message.channel.send("You didn't tag a valid user.");
    }
    
    let user = message.mentions.users.first();
    let current_timestamp = utils.getLocalDateTime();
    let poll = await message.channel.send({ embed: {
        title: `${user.tag} has been accused by ${message.author.tag} of undermining`,
        description: `Vote ✅ if you believe ${user.tag} is guilty.\nVote ❌ if you believe ${user.tag} is innocent.\n\nThe poll will close in ${config.options.poll_close_time} second(s).`
    }});
    await poll.react("✅");
    await poll.react("❌");
    
    setTimeout(async () => {
        let yes_votes = poll.reactions.cache.get("✅").count - 1;
        let no_votes = poll.reactions.cache.get("❌").count - 1;
        if (yes_votes - no_votes > 0) {
            await CountsService.incrementCount(user.id, yes_votes - no_votes, current_timestamp);
            let record = await CountsService.pk(user.id);
            poll.reactions.cache.get("✅").users.cache.forEach((underminee, id) => {
                if (underminee.id === client.user.id)
                    return;
                UnderminesService.incrementCount(user.id, underminee.id, current_timestamp);
            });
            message.channel.send({ embed: { description: `In ${message.author.tag} v. ${user.tag}, with a ${yes_votes} - ${no_votes} vote, the people of "${message.guild.name}" have determined that ${user.tag} is guilty of the charge of undermining. This user has undermined ${yes_votes-no_votes} person(s).\n\nThis user has undermined a total of ${record.count} person(s).` }});
            MetricsService.updateMetrics(user.id, record.count, current_timestamp);
        } else {
            message.channel.send({ embed: { description: `In ${message.author.tag} v. ${user.tag}, with a ${yes_votes} - ${no_votes} vote, the people of "${message.guild.name}" have determined that ${user.tag} is not guilty of the charge of undermining.` }});
        }
    }, config.options.poll_close_time * 1000);
};
