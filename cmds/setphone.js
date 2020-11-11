const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.reply(
      "You need the `MANAGE_SERVER` permission to change phone numbers!"
    );

  let number = args[1];
  if (!number) return message.channel.send("Specify a phone number!");

  if (number == "0000") {
    bot.db.set(`${message.guild.id}_phoneNumber`, "NONE");
    message.channel.send("Erased your phone number!");
    return;
  }

  let phoneValid = await bot.phoneValid(number);
  if (!phoneValid)
    return message.channel.send(
      "Phone numbers are **4** digits in length, and they are all numbers!"
    );

  let isTaken = await bot.verifyPhoneNumber(number);
  if (isTaken) return message.channel.send("That phone number was taken!");

  let success = await bot.setPhoneNumber(message.guild, number);
  if (!success) return message.reply("An error occoured.");

  message.channel.send("Your phone number has been set to " + number);
};

module.exports.help = {
  name: "setphone",
  description: "",
  usage: "setphone [phone-number]",
  type: "phone",
  commandAliases: []
};
