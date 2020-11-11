const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  function dur(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    return `\`${days.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(
      2,
      "0"
    )}m ${sec.padStart(2, "0")}s\``;
  }

  const embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(dur(bot.uptime));
  message.channel.send(embed);
};

module.exports.help = {
  name: "uptime",
  description: "",
  usage: "uptime",
  type: "other",
  commandAliases: []
};
