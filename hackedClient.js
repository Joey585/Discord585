const {Client, GatewayIntentBits} = require("discord.js");
const EventEmitter = require("events").EventEmitter;

class Bot extends EventEmitter {
    constructor(token) {
        super();
        this.bot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]})
        this.bot.login(token).catch(() => {
            return 0;
        })
        this.bot.on("ready", () => {
            console.log("Logged In.");
            this.emit("complete", {bot: this.bot});
        });
    }

    sendMessage(channel, message){
        if(message.length === 0) return false;
        channel.send(message).then((m) => {
            return m;
        })
    }
    setCurrentChannel(channel){
        this.currentChannel = channel;
    }
    getCurrentChannel(){
        if(this.currentChannel){
            return this.currentChannel;
        }
    }

}

module.exports = {Bot}

