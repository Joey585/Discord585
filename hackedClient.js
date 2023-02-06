const {Client} = require("discord.js-selfbot-v13");
const EventEmitter = require("events").EventEmitter;

class Bot extends EventEmitter {
    constructor(token) {
        super();
        this.bot = new Client({})
        this.bot.login(token).catch((e) => {
            this.emit("fail", (e));
        });

        this.bot.on("error", (e) => {
            console.log(e)
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
    getDiscordImage(){
        return ""
    }

}

module.exports = {Bot}

