const {Client, GatewayIntentBits} = require("discord.js");
const EventEmitter = require("events").EventEmitter;

class Bot extends EventEmitter {
    constructor(token) {
        super();
        this.bot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent]})
        this.bot.login(token)
        this.bot.on("ready", () => {
            console.log("Logged In.")
            this.emit("complete", {bot: this.bot});
        });
    }

    sendMessage(channel, message){
        if(message.length === 0) return false;
        channel.send(message).then((m) => {
            return m;
        })
    }

}

module.exports = {Bot}

