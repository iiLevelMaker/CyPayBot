var Colors = require('colors/safe');

module.exports = {
  name: 'ping',
  description: 'Get your latency in milliseconds',
  guildOnly: true,
  execute(client, message, args) {
    message.channel.send("Pinging...").then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp

      m.edit(`🏓 Pong! Took:** ${ping}ms **, API Latency: **${Math.round(client.ping)}ms**`)
    })
  },
};
