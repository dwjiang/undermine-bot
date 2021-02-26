const Discord = require("discord.js");

const config = require("@config/config");

module.exports = async (client, message, cooldowns) => {
    try {
        const args = message.content.slice(config.options.prefix.length).trim().split(/ +/);
        const command_name = args.shift().toLowerCase();
        
        if (!client.commands.has(command_name))
            return message.channel.send("Invalid command");
        
        const command = client.commands.get(command_name);
        
        if (command.cooldown != null && command.cooldown > 0) {
            if (!cooldowns.has(command_name)) {
                cooldowns.set(command_name, new Discord.Collection());
            }
            const now = Date.now();
            const timestamps = cooldowns.get(command_name);
            const cooldown_amount = command.cooldown * 1000;
            if (timestamps.has(message.author.id)) {
                const expiration = timestamps.get(message.author.id) + cooldown_amount;
                if (now < expiration) {
                    const time_left = (expiration - now) / 1000;
                    return message.reply(`please wait ${time_left.toFixed(0)} more second(s) before reusing the \`${command_name}\` command.`)
                }
            }
            
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldown_amount);
        }
                
        command.run(client, message, args);
        
        
    } catch (error) {
        console.error(error);
        message.channel.send("There was an error executing that command.");
    }
}
