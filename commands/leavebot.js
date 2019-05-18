var Colors = require('colors/safe');

module.exports = {
  name: 'botleave',
  description: 'Makes the bot leave the current server! (Bot owner only)',
  guildOnly: true,
  execute(client, message, args) {
    if (message.author.id !== '322737149982277632') return message.reply(`You need to be the bot owner to execute this command!`);
    message.reply('Alright let me leave this server.');
    message.delete();
    message.guild.leave();
  }
}
