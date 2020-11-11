const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let number = args[1];
  if (!number) return message.channel.send("Specify a phone number!");
  let number2 = number;

  let phoneValid = await bot.phoneValid(number);
  if (!phoneValid)
    return message.channel.send(
      "Phone numbers are **4** digits in length, and they are all numbers!"
    );

  let isTaken = await bot.verifyPhoneNumber(number);
  if (!isTaken)
    return message.channel.send("That phone number does not exist!");

  let guild1 = message.guild;
  let guild2 = await bot.findGuild(number);
  if (guild1.id == guild2.id)
    return message.channel.send("You can not call your own guild!");

  let chan1 = message.channel;
  let chan2;
  guild2.channels.cache.forEach(c => {
    if (c.type == "text") {
      if (c.topic) {
        if (c.topic.includes("ChatBotPHONE")) return (chan2 = c);
      }
    }
  });
  if (!chan2) chan2 = await bot.getDefaultChannel(guild2);
  if (!chan2) return message.channel.send("An error occoured.");

  let number1 = await bot.db.fetch(`${message.guild.id}_phoneNumber`);

  message.delete(100);

  let msg1;
  let msg2;

  chan1
    .send("Calling **" + guild2.name + "** <a:LoadingGreen:553250648179867648>")
    .then(m => {
      msg1 = m;
    });
  chan2
    .send("You are receiving a call from **" + guild1.name + "**")
    .then(m => {
      msg2 = m;
    });

  var answered = false;
  var ended = false;

  const end = setTimeout(function() {
    ended = true;
    msg1.edit("**" + guild2.name + "** did not answer the call.");
    msg2.edit("You have a missed call from **" + guild1.name + "**.");
    return;
  }, 15500);

  bot.on("message", async msg => {
    if (
      msg.guild.id == guild2.id &&
      msg.channel.id == chan2.id &&
      !answered &&
      !ended
    ) {
      if (msg.content !== "answer" && msg.content !== "decline") return;
      if (msg.content == "answer") {
        answered = true;
        clearTimeout(end);
        chan1.send("The other side answered the call!");
        chan2.send("You have answered the call.");
        msg1.delete();
        msg2.delete();
      }
      if (msg.content == "decline") {
        ended = true;
        clearTimeout(end);
        chan1.send("Your call was declined.");
        chan2.send("Call from **" + guild1.name + "** declined.");
        msg1.delete();
        msg2.delete();
      }
    }
    if (!answered) return;
    if (msg.author.bot) return;
    if (ended) return;

    if (msg.guild.id == guild1.id && msg.channel.id == chan1.id) {
      if (msg.content == "hang up") {
        chan1.send("Call ended.");
        chan2.send("The other guild ended the call.");
        msg.delete();
        ended = true;
        return;
      }
    }
    if (msg.guild.id == guild2.id && msg.channel.id == chan2.id) {
      if (msg.content == "hang up") {
        chan1.send("The other guild ended the call.");
        chan2.send("Call ended.");
        msg.delete();
        ended = true;
        return;
      }
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
      .setDescription(msg.content);

    if (msg.guild.id == guild1.id && msg.channel.id == chan1.id) {
      if (msg.content == "answer" || msg.content == "hang up") return;
      msg.delete(100);
      embed.setFooter("➡ " + guild2.name + " | " + number2, guild2.iconURL);
      chan1.send(embed);
      embed.setFooter("⬅ " + guild1.name + " | " + number1, guild1.iconURL);
      chan2.send(embed);
    }
    if (msg.guild.id == guild2.id && msg.channel.id == chan2.id) {
      if (msg.content == "answer" || msg.content == "hang up") return;
      msg.delete(100);
      embed.setFooter("⬅ " + guild2.name + " | " + number2, guild2.iconURL);
      chan1.send(embed);
      embed.setFooter("➡ " + guild1.name + " | " + number1, guild1.iconURL);
      chan2.send(embed);
    }
  });
};

module.exports.help = {
  name: "call",
  description: "Call a phone to chat with them in the current channel.",
  usage: "call [phone-number]",
  type: "phone",
  commandAliases: ["c"]
};
