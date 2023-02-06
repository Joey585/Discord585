const renderMessages = require('./renderMessages');

module.exports = {
    name: "renderDms",
    description: "Render the dms that the user has",
    run: async (bot) => {
        console.log(bot)
        const dmChannels = bot.bot.channels.cache;
        dmChannels.forEach((channel) => {
           if(channel.guild === undefined){
               const dmChannel = document.createElement("div");
               if(channel.recipient === undefined) return;
               const dmWith = document.createTextNode(channel.recipient.username);
               dmChannel.addEventListener("click", () => {
                   renderMessages.run(bot, channel);
                   bot.setCurrentChannel(channel);
               });
               dmChannel.appendChild(dmWith);
               document.getElementById("channel-frame").appendChild(dmChannel);
           }
        });
    }
}