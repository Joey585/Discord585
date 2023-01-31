module.exports = {
    name: "messagesShow",
    description: "Shows the last 15 messages in channel",
    run: async (bot, channel) => {
        const messageFrame = document.getElementById("message-frame");
        messageFrame.innerHTML = '';
        const recentMessages = await channel.messages.fetch({limit: 15});

        for(const message of recentMessages){
            const messageDiv = document.createElement("div");
            const messageContent = document.createElement("span");
            messageContent.innerHTML = (`${message[1].author.username}: ${parseMessage(message[1].content)}`);
            messageDiv.appendChild(messageContent);
            messageFrame.appendChild(messageDiv);
        }

        reverseChildren(messageFrame);


        const messageBox = document.createElement("input");
        messageBox.placeholder = `Message #${channel.name}`;
        messageBox.className = 'messageBox';
        document.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                if(messageBox.value.length > 0) {
                    bot.sendMessage(channel, messageBox.value);
                    messageBox.value = "";
                }
            }
        });
        messageFrame.appendChild(messageBox);

    }
}

function reverseChildren(parent) {
    for (var i = 1; i < parent.childNodes.length; i++){
        parent.insertBefore(parent.childNodes[i], parent.firstChild);
    }
}

function parseMessage(messageContent){
    messageContent.replaceAll("\n", "<br>")
    return messageContent;
}