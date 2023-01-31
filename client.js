const {Bot} = require("./hackedClient");
const channelShow = require("./render/renderChannels");
const messageShow = require("./render/renderMessages");
const messageReceived = require("./render/messageReceived");
const fs = require("fs");


document.getElementById("login").addEventListener("click", async () => {
   const token = document.getElementById("token").value;
   if(token.length === 0) return;

   global.bot = await new Bot(token);

   loginVisibility("loading");

   bot.on("fail", (e) => {
      if(e.toString().includes("[TOKEN_INVALID]")){
         document.getElementById("error").innerText = "Your token is invalid!";
         loginVisibility(true);
         document.getElementById("login").value = "";
      }
   });

   bot.once("complete", (client) => {
      loginVisibility(false);
      document.getElementById("login-label").style.display = "none";
      const guilds = client.bot.guilds.cache;

      document.title = `Control panel for ${client.bot.user.username}`

      guilds.forEach((guild) => {
         const guildFrame = document.getElementById("guild-frame");
         const guildCircle = document.createElement("div");
         const guildPfp = document.createElement("img");
         const guildName = document.createElement("p")

         guildName.className = "guildName"
         guildName.innerText = `${guild.name}`;

         guildPfp.src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`;
         guildCircle.id = guild.name;
         guildCircle.className = `guildCircle`;

         guildPfp.addEventListener("mouseover", () => {
            guildCircle.style.borderRadius = "25%";
            guildName.style.display = "block";
         });
         guildPfp.addEventListener("mouseout", () => {
            guildCircle.style.borderRadius = "50%";
            guildName.style.display = "none";
         });
         guildCircle.addEventListener("click", () => {
            document.getElementById("message-frame").innerHTML = "";
            channelShow.run(bot, guild);
         });
         guildCircle.appendChild(guildPfp);
         guildCircle.appendChild(guildName);
         guildFrame.appendChild(guildCircle);
      });

      client.bot.on("messageCreate", (m) => {
         console.log("Message Received from discordjs")
         messageReceived.run(bot, m);
      });
   });

});

function loginVisibility(show){
   if(show){
      document.getElementById("login").style.display = "block";
      document.getElementById("login-label").innerText = "Enter your token:"
      document.getElementById("token").style.display = "block";
   }
   if(show === "loading"){
      document.getElementById("login").style.display = "none";
      document.getElementById("login-label").innerText = "Loading..."
      document.getElementById("token").style.display = "none";
      document.getElementById("error").innerText = "";
   }
   if(!show){
      document.getElementById("login").style.display = "none";
      document.getElementById("login-label").style.display = "none";
      document.getElementById("token").style.display = "none";
   }
}