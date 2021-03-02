module.exports = {
    description: "Use this command appeal an undermine vote",
    usage: {},
    examples: {}
};

module.exports.run = async (client, message, args) => {
    message.channel.send({ embed: {
        title: "There is no appealing an undermine conviction",
        image: {
            url: "https://i.imgur.com/sAveAUW.jpg"
        }
    }});
};
