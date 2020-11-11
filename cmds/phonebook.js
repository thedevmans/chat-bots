const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let phonebook = new Promise(async (resolve, reject) => {
    var nums = [];
    await bot.guilds.cache.forEach(async g => {
      let num = await bot.db.fetch(`${g.id}_phoneNumber`);
      let phoneValid = await bot.phoneValid(num);
      if (phoneValid) {
        nums.push("**" + g.name + "**: " + num);
      }
      if (g.id == bot.guilds.cache.last().id) resolve();
    });
  });

  phonebook.then(nums => {
    message.channel.send(nums || "None", { split: true });
  });
};

module.exports.help = {
  name: "phonebook",
  description: "See the phonebook of all the phone numbers.",
  usage: "phonebook",
  type: "phone",
  commandAliases: ["pb", "phonenumbers"]
};
