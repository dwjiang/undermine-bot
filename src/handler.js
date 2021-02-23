
const config = require("@config/config");

module.exports = async (client, message) => {
    try {
        if (!message.content.startsWith(config.options.prefix) || message.author.bot)
            return;
        const args = message.content.slice(config.options.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        if (!client.commands.has(commandName))
            return message.channel.send("Invalid command");
            
        const command = client.commands.get(commandName);
        command.run(client, message, args);
    } catch (error) {
        message.channel.send("There was an error executing that command");
    }
}
