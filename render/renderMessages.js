module.exports = {
    name: "messagesShow",
    description: "Shows the last 15 messages in channel",
    run: async (bot, channel) => {
        const messageFrame = document.getElementById("message-frame");
        messageFrame.innerHTML = '';
        const recentMessages = await channel.messages.fetch({limit: 15});

        for(const message of recentMessages){
            const messageDiv = document.createElement("div");
            const messageContent = document.createTextNode(message[1].content)
            messageDiv.appendChild(messageContent);
            messageFrame.appendChild(messageDiv);
        }
    }
}