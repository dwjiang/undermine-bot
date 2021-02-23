module.exports = {
    description: "ping me",
    usage: {},
    examples: {}
};

module.exports.run = async (client, message, args) => {
    message.channel.send("pong");
};
