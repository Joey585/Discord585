const {Bot} = require("./hackedClient");


document.getElementById("login").addEventListener("click", async () => {
   const token = document.getElementById("token").value;
   if(token.length === 0) return;
   global.bot = await new Bot(token);
   bot.once("complete", (client) => {
      document.getElementById("login").style.display = "none";
      document.getElementById("login-label").style.display = "none";
      document.getElementById("token").style.display = "none";

      const guilds = client.bot.guilds.cache;

      document.title = `Control panel for ${client.bot.user.username}`

      guilds.forEach((guild) => {
         const guildFrame = document.getElementById("guild-frame");
         const guildCircle = document.createElement("div");
         const guildPfp = document.createElement("img");
         const guildName = document.createElement("span")

         guildName.className = "guildName"
         guildName.innerText = `${guild.name}`;

         guildPfp.src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`;
         guildCircle.id = guild.name;
         guildCircle.className = `guildCircle`;

         guildPfp.addEventListener("mouseover", () => {
            guildName.style.display = "block";
         });
         guildPfp.addEventListener("mouseout", () => {
            guildName.style.display = "none";
         })
         guildCircle.appendChild(guildPfp);
         guildCircle.appendChild(guildName);
         guildFrame.appendChild(guildCircle);
      })
   })
})