const Discord = module.require("discord.js");
const emoji = require("./../emojis.json");

module.exports.run = async (bot, message, args) => {
  let inviteEmbed = new Discord.MessageEmbed()
    .setDescription(
      "Here Is Your **[Invite Link](https://discordapp.com/oauth2/authorize?client_id=650149678272479233&permissions=0&scope=bot)** for Chatbot."
    )
    .setColor(16752128)
    .setFooter("ChatBot | Invite Link")
    .setAuthor("Invite Link", null, null);
  message.channel.send(inviteEmbed);
};
module.exports.help = {
  name: "invite",
  description: "Get the bot's invite and support server.",
  usage: "invite",
  type: "other",
  commandAliases: ["i", "support"]
};
