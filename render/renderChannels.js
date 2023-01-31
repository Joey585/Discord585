const messagesShow = require("./renderMessages");

module.exports = {
    name: "channelShow",
    description: "Shows all channels of the selected guild",
    run: async (bot, guild) => {
        const channelFrame = document.getElementById("channel-frame");
        channelFrame.innerHTML = '';

        const channels = guild.channels.cache;

        channels.forEach((channel) => {
            const channelDiv = document.createElement("div");

            channelDiv.addEventListener("click", () => {
                bot.setCurrentChannel(channel);
                messagesShow.run(bot, channel);
            });

            const channelName = document.createTextNode(`#${channel.name}`);
            channelDiv.appendChild(channelName);
            channelFrame.appendChild(channelDiv);
        });
    }
}