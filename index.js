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

client.on("message", message => {
    require("@src/handler")(message.client, message);
});

const config = require("@config/config");
client.login(config.credentials.discord_token);
