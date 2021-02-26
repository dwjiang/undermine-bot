require("module-alias/register")
require("dotenv").config();

const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commands = require("@commands");
for (let [ name, command ] of Object.entries(commands)) {
    client.commands.set(name, command);
}

client.once("ready", async () => {
    console.log("Client ready");
});

const cooldowns = new Discord.Collection();
client.on("message", message => {
    if (message.author.bot)
        return;
    else if (message.content.startsWith(config.options.prefix))
        require("@src/handlers/commands")(client, message, cooldowns);
    else
        require("@src/handlers/general")(client, message);
});

const config = require("@config/config");
client.login(config.credentials.discord_token);
