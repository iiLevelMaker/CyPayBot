const botconfig = require('./botconfig.json');
const tokenfile = require('./token.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
var colors = require('colors/safe');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}



//colors
var error = colors.red;
var silly = colors.rainbow;
var verbose = colors.cyan;
var prompt = colors.grey;
var info = colors.green;
var help = colors.cyan;
var warn = colors.yellow;
var debug = colors.blue;

client.once('ready', () => {
  console.log(info(`${client.user.username} is online on ${client.guilds.size} servers!`));

  client.user.setActivity('over your server', {type: "WATCHING"});
  console.log(info(`${client.user.username}'s Activity has changed.'`));
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Welcome to ${member.guild.name}, ${member}`);
});

client.on('message', message => {
  if (!message.content.startsWith(botconfig.prefix) || message.author.bot) return;

  const args = message.content.slice(botconfig.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  try{
    command.execute(client, message, args);
  } catch (e) {
    console.log(error(e));
    message.reply('There was an error trying to execute that command!');
  }
});

client.login(tokenfile.token)
