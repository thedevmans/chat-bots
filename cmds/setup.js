const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let item = args[1];

  const embed = new Discord.MessageEmbed().setFooter(
    "To see the other features of the bot, use " + bot.prefix + "help"
  );

  if (item == "irc") {
    embed.setAuthor("How to Set Up IRC", message.author.displayAvatarURL);
    embed.addField(
      "Public IRC",
      'To set up the public IRC, put `""Public""` in the channel\'s description.'
    );
    embed.addField(
      "Other IRCs",
      'You can also set up a custom IRC with ChatBot! Just put `""` and `""` around your custom code.'
    );
    embed.addField(
      "Limitations",
      'There are a few limitations with ChatBot\'s IRC.\n\n1. You can only have one IRC channel per code, per server.\n2. You can only have the two `""`s in your description. You can not have any other double-quotes in your description.\n\nSome of these limitations may be fixed in the future!'
    );
    message.channel.send(embed);
    return;
  }
  if (item == "phone") {
    embed.setAuthor("How to Set Up the Phone", message.author.displayAvatarURL);
    embed.addField(
      "Setting your Phone Number",
      "To set your phone number, use `" +
        bot.prefix +
        "setphone [number]`. Phone numbers are four digits in length. Your phone number will be used for other guilds to call you. You can use `0000` as the phone number to erase your current number."
    );
    embed.addField(
      "Your Receiving Channel",
      "To reveive calls in a specific channel, put `ChatBotPHONE` in it's description. All received calls will be routed to that channel. If you do not have a receiving channel, the bot will choose the default channel to send the call to."
    );
    embed.addField(
      "Calling a Guild",
      "To call a guild, use `" +
        bot.prefix +
        'call [number]` to call a guild with that phone number. The guild will have to answer the call before your messages will be routed to it. Calls "ring" for fifteen seconds. After they answer the call, all messages sent in the channel the command was used will also be sent to the guild.'
    );
    embed.addField(
      "Answering and Hanging Up Calls",
      "To answer a call, say `answer` in the receiving channel. To hang up a call, say `hang up` in the channel.\nYou can also decline calls by saying `decline`."
    );
    embed.addField(
      "Phonebook",
      "Use `" +
        bot.prefix +
        "phonebook` to see the phone number for each guild."
    );
    message.channel.send(embed);
    return;
  }
  message.channel.send(
    "Use `ch!setup irc` or `ch!setup phone` to see their setup!"
  );
};

module.exports.help = {
  name: "setup",
  description: "",
  usage: "setup",
  type: "other",
  commandAliases: []
};