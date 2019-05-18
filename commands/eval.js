var Colors = require('colors/safe');

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

module.exports = {
  name: 'eval',
  description: 'Execute a javascript in discord! Only works if your the bot owner.',
  guildOnly: true,
  execute(client, message, args) {
    if (message.author.id !== '322737149982277632') return message.reply(`You need to be the bot owner to execute this command!`);
    if (!args[0]) return message.reply("Usage: =eval JAVASCRIPTCODE");
    //commmand

    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(
        "Successfully executed code: ``` " + code + "```"
      );
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

  },
};
