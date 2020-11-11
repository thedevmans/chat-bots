const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!bot.devPerms.includes(message.author.id)) return;

  let func = args.slice(1).join(" ");
  let evl = "FATAL_ERROR";

  function refresh() {
    console.log("FRESH");
    require("child_process").execSync("refresh", { encoding: "utf-8" });
  }

  try {
    evl = eval(func);
  } catch (e) {
    evl = e;
  }

  let evalEmbed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL)
    .addField("Input", "```js\n" + func + "\n```")
    .addField("Output", "```\n" + evl + "\n```");
  message.channel.send(evalEmbed);
};
module.exports.help = {
  name: "eval",
  description: "Evaluate JS code in the bot!",
  usage: "eval [code]",
  type: "admin",
  commandAliases: [],
};
