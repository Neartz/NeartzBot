const Discord = require('discord.js');

const bot = new Discord.Client();

const config = require(`./config.json`); 

const fs = require('fs');

const owner = '451645255461371914'

let ops = {
  owner: owner
}

bot.on('error', console.error);
bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args, ops);
  } catch (err) {
    console.error(err);
  }
});

bot.on('ready', arg => {
  console.log('Бот запустился! Наверное...');
  console.log(`${bot.user.tag} is online on ${bot.guilds.size} servers!`)
});



bot.login(process.env.BOT_TOKEN);
