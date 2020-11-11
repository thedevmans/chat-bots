const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let guild = message.guild;

  const embed = new Discord.MessageEmbed();

  embed.setAuthor("ChatBot Welcome Information", bot.user.displayAvatarURL);
  embed.setDescription(
    "This is a small guide and description of ChatBot and it's features.\nChatBot is a Discord bot that makes chatting with users easier. You can chat across non-mutual guilds with a few keyboard clicks! No more need for DMs! No more need for invites! Everything in one bot!"
  );
  embed.setFooter(
    "Thank you for adding ChatBot to your server!",
    guild.iconURL
  );
  embed.setTimestamp();
  embed.addField(
    "Setup Information",
    "To get information about how to set up the IRC and Phone, use `" +
      bot.prefix +
      "setup`."
  );

  await bot.guilds
    .get("592193021983064067")
    .channels.get("592196193979858964")
    .createInvite({
      maxUses: 2,
      maxAge: 0,
      reason: "Guild " + guild.name + "'s Welcome Invite'"
    })
    .then(i => {
      embed.addField(
        "Contact Us",
        "[CONTACT US HERE](" +
          i +
          ")\nThe invite has two uses to prevent spam. To get a permanant one, please ask in the support server."
      );
    });

  message.channel.send(embed);
};

module.exports.help = {
  name: "test",
  description: "",
  usage: "test",
  type: "other",
  commandAliases: []
};
