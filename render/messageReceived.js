module.exports = {
    name: "receiveMessage",
    description: "Fires when the bot received a message",
    run: async (bot, message) => {
        if(message.channel.id === bot.getCurrentChannel().id){
            console.log("Message is from the selected channel!")
            const messageFrame = document.getElementById("message-frame");
            const messageDiv = document.createElement("div");
            const messageContent = document.createTextNode(message.content)
            messageDiv.appendChild(messageContent);
            messageFrame.appendChild(messageDiv);
        }
    }
}