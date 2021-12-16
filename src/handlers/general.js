const Discord = require("discord.js");
const fs = require('fs');

const config = require("@config/config");

module.exports = async (client, message, cooldowns) => {
    try {
        const deletedCheckWaitTime = 10000;
        const checkDeleted = Promise((resolved) => {
            setTimeout(
                () => {resolved(message.deleted)},
                deletedCheckWaitTime);
        }
        const check = async (message) => {
            let sender = message.author;
            let text = message.content;
            checkDeleted.then((wasDeleted) => {
                if (wasDeleted) {
                    message.channel.send(`${sender} the rat deleted this message: ${text}`);
                } else {
                    // Do whatever you want here
                }
            });
        };
        check(message);
        // todo: for future use
    } catch (error) {
        console.error(error);
    }
}
