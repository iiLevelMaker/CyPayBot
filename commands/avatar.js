var Colors = require('colors/safe');

module.exports = {
  name: 'avatar',
  description: 'Get users avatar just from one command.',
  guildOnly: true,

  execute(client, message, args) {
    if (!args[0]) return message.reply(`You need to provide a argument. Usage: =avatar @user`);

    if (!args[0].includes("@")) return message.reply(`You need to mention the user, Usage: =avatar @user`);

    var user = message.mentions.users.first();

    message.reply(`Here's your Avatar for ${user}: ${user.avatarURL}`);
  }
}
