const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const bot = new Discord.Client({ disableMentions: "all" });
const fs = require("fs");
const config = require("./config.json");
const ms = require("ms");
let startup = Date.now();
const extract = require("tcc-cdn");
extract("texttools").use();

const db = require("enhanced.db");
db.options({
  clearOnStart: false,
  filename: "database.sqlite"
});
db.fetch = db.get;

bot.prefix = config.prefix;
bot.vip = config.vipusers;
bot.devPerms = config.devPerms;
bot.coolServers = config.VIPservers;
bot.bannedIRCuser = config.bannedUsersIRC;
bot.db = db;
bot.blockedStuff = config.blocked;
bot.config = config;

function emoji(id) {
  return bot.emojis.get(id).toString();
}

bot.commands = new Discord.Collection();
bot.commandDescriptions = new Object();
bot.commandUsages = new Object();
bot.commandTypes = new Object();
bot.commandAliases = [];
bot.commandRequirements = new Object();

fs.readdir("./cmds/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
    bot.commandDescriptions[props.help.name] = props.help.description;
    bot.commandUsages[props.help.name] =
      "`" + bot.prefix + props.help.usage + "`";
    bot.commandTypes[props.help.name] = props.help.type;
    if ((props.help.commandAliases || []).length >= 1)
      bot.commandAliases.push({
        for: props.help.name,
        aliases: props.help.commandAliases
      });
  });
  console.log(`Loaded ${jsFiles.length} commands. THUNDERBIRDS ARE GO!`);
});

bot.cooldown = async (cooldown, id, task) => {
  let taskDone = await bot.db.fetch(`${task}_${id}`);
  let timeObj = require("parse-ms")(cooldown - (Date.now() - taskDone));
  if (taskDone !== null && cooldown - (Date.now() - taskDone) > 0) {
    return timeObj;
  }
  return;
};

Object.prototype.sort = function() {
  let o = this;
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
};

bot.phoneValid = async number => {
  if (!Number(number)) return false;
  if (number.length !== 4) return false;
  if (Number(number) <= 0) return false;
  return true;
};

bot.verifyPhoneNumber = async number => {
  var numbers = [];
  await bot.guilds.cache.forEach(async g => {
    let g_phone = await bot.db.fetch(`${g.id}_phoneNumber`);
    numbers.push(g_phone);
  });
  await console.log(numbers);
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log(numbers);
  if (numbers.includes(number)) return true;
  if (!numbers.includes(number)) return false;
};

bot.setPhoneNumber = async (g, number) => {
  bot.db.set(`${g.id}_phoneNumber`, number);
  console.log("Phone number set to " + number + " for " + g.name + "!");
  return true;
};

bot.getDefaultChannel = guild => {
  if (!guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR")) {
    return guild.channels
      .sort(function(chan1, chan2) {
        if (chan1.type !== `text`) return 1;
        if (!chan1.permissionsFor(guild.me).has(`SEND_MESSAGES`)) return -1;
        return chan1.position < chan2.position ? -1 : 1;
      })
      .first();
  }
  let channelID;
  let channels = guild.channels;
  channelLoop: for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }
  let channel = bot.channels.get(guild.systemChannelID || channelID);
  return channel;
};

bot.findGuild = async num => {
  var guild;
  await bot.guilds.cache.forEach(async g => {
    let g_phone = await bot.db.fetch(`${g.id}_phoneNumber`);
    if (g_phone == num) guild = g;
  });
  await console.log(guild);
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  await console.log("Waiting...");
  return guild;
};

bot.cleanMessage = async msg => {
  let content = msg.content;
  content.split("@everyone").join("`@everyone`");
  content.split("@here").join("`@here`");
  content.split("<@").join("`");
  content.split(">").join("`");
  return content;
};

bot.on("ready", () => {
  bot.startupTime = Date.now() - startup;
  console.log(
    `Bot ${bot.user.username} is on! Startup time: ${ms(bot.startupTime)}`
  );
  bot.user.setPresence({
    activity: {
      name: `${bot.guilds.cache.size} servers and ${bot.users.cache.size} users!`,
      type: "WATCHING"
    }
  });
  setInterval(function() {
    bot.user.setPresence({
      activity: {
        name: `${bot.guilds.cache.size} servers and ${bot.users.cache.size} users!`,
        type: "WATCHING"
      }
    });
  }, 30000);
  bot.guild = {};
  bot.devPerms.forEach(d => {
    bot.users.fetch(d);
  });
  bot.guilds.cache.forEach(g => {
    g.members.cache.forEach(m => {
      m.id;
    });
  });
});

bot.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(bot.prefix)) {
    let args = message.content
      .substring(bot.prefix.length)
      .trim()
      .split(/ +/g);

    let cmd = bot.commands.get(args[0].toLowerCase());

    if (!cmd) {
      let name;

      bot.commandAliases.forEach(a => {
        if (a.aliases.includes(args[0].toLowerCase())) name = a.for;
      });

      cmd = bot.commands.get(name);
    }
    if (!cmd) return;

    cmd.run(bot, message, args);
  }
});

bot.on("message", async message => {
  if (message.author.bot) return;

  let color = "#ACACAC";
  if (bot.coolServers.includes(message.guild.id)) color = "#FF0000";

  if (!message.channel.topic) return;
  let irc = message.channel.topic.split('""')[1];
  if (!irc) return;

  let content = message.content;
  let author = message.author;
  let guild = message.guild;
  let image = message.attachments.first();

  if (
    bot.devPerms.includes(message.author.id) &&
    message.content.startsWith(bot.prefix + "sudo")
  ) {
    message.delete();
    let argz = message.content.split(" ");

    let ID = argz[1];
    if (ID.length !== 18 && !Number(ID))
      return message.author.send("Failed! Incorrect ID.");
    let member = bot.users.cache.get(ID);
    if (!member) return message.author.send("Failed! Incorrect member.");
    let mesage = argz.slice(2).join(" ");

    content = mesage;
    author = member;
  }

  if (
    !bot.devPerms.includes(message.author.id) &&
    message.content.startsWith(bot.prefix + "sudo")
  ) {
    author.send("You can not use that command!");
    message.delete();
  }

  let no = [];
  bot.blockedStuff.forEach(b => {
    if (content.toLowerCase().includes(b.toLowerCase())) no.push(b);
  });
  if (no.length > 0)
    return message.author.send(
      "You can not send `" + no.join("`, `") + "` in IRC!"
    );

  if (bot.devPerms.includes(author.id)) color = bot.config.devColor;

  let lastMessage = await bot.cooldown(1000, message.author.id, "lastMessage");
  if (lastMessage && !bot.devPerms.includes(message.author.id))
    return message.channel.send(
      "You are sending messages too fast! Try again in **" +
        lastMessage.milliseconds +
        "ms**."
    );
  bot.db.set(`lastMessage_${message.author.id}`, Date.now());

  const msg = new Discord.MessageEmbed();
  msg.setColor(color);
  msg.setAuthor(author.tag + " (" + author.id + ")", author.displayAvatarURL);
  msg.setDescription(content);
  msg.setFooter(guild.name + " (" + guild.id + ")", message.guild.iconURL);
  msg.setTimestamp();

  if (image) msg.setImage(image.url);

  let chan1 = message.guild.channels.cache
    .filter(chl => chl.topic)
    .find(c => c.topic.includes('""' + irc + '""'));
  if (!chan1) return;
  if (message.channel.id !== chan1.id) return; // DONT REMOVE THIS

  /*if (bot.bannedIRCuser.includes(message.author.id))
    return message.author.send(
      "You are banned from ChatBot's IRC. You will no longer be able to send messages!"
    ); */
  bot.guilds.cache.forEach(guild => {
    let chan2 = guild.channels.cache
      .filter(chl => chl.topic)
      .find(c => c.topic.includes('""' + irc + '""'));
    if (!chan2) return;
    chan2.send(msg);
  });
  message.delete();
});

bot.on("guildCreate", guild => {
  bot.users.cache
    .get("648343663767846924")
    .send(
      `I joined **${guild.name}** (id: ${guild.id}). This guild has **${guild.memberCount} members**!`
    );

  bot
    .getDefaultChannel(guild)
    .send(
      `Thanks for inviting me into this server! \`ch!setup\` to get started`
    );
});
bot.on("guildDelete", guild => {
  bot.users
    .get("648343663767846924")
    .send(`I have been removed from **${guild.name}** (id: ${guild.id})`);

  guild.owner.send("Bye Friend! nice knowing you");
});

bot.login(process.env.TOKEN);
