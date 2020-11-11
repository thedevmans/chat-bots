const { MessageEmbed } = require("discord.js");
const os = require("os");
const envinfo = require("envinfo");
const ms = require("ms");
const cpuStat = require("cpu-stat");

module.exports.run = async (bot, message, args) => {
  let devs = [];
  bot.devPerms.forEach(d => {
    devs.push(bot.users.cache.get(d));
  });

  cpuStat.usagePercent(async function(err, percent, seconds) {
    var p = percent;
    var t = p.toString().slice(0, 5);

    const inf = await envinfo.run(
      {
        System: ["OS", "CPU", "Memory", "Shell"]
      },
      { json: true }
    );
    let { System } = JSON.parse(inf);
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`Bot Information`, bot.user.displayAvatarURL())
      .addField(
        "System Information",
        `**❯ OS:** ${System.OS} ${os.arch()} ${os.type()}
      **❯ User:** ${os.userInfo().username}@${os.hostname()}
      **❯ CPU:** ${System.CPU}
      **❯ RAM:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} mb/s`
      )
      .addField(
        "Other Information",
        `**❯ Commands:** ${bot.commands.size}
      **❯ Library:** [discord.js](${"https://discord.js.org/"})
      **❯ Users | Guilds:** ${bot.users.cache.size} users | ${
          bot.guilds.cache.size
        } guilds
      **❯ Shard:** 0/0
      **❯ CPU Usage:** ${t}%
      **❯ System Memory:** ${System.Memory}
      **❯ Startup Time:** ${ms(bot.startupTime, { long: true })} `
      )
      .addField("Acknowledgements", `**❯ Bot Owners:** ${devs.join(", ")}`);

    message.channel.send(embed);
  });
};

module.exports.help = {
  name: "stats",
  description: "",
  usage: "stats",
  type: "other",
  commandAliases: []
};
