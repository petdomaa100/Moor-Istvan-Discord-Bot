const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const sayMessage = args.join(' ');

    message.delete().catch();

    message.channel.send(sayMessage);
}

module.exports.help = {
  name: 'say',
  aliases: ['mond', 'szavald'],
  usage: 'say <amit ki szeretnél mondatni Moórral>',
  description: 'Kimondja amit a command után írtál.',
  accessableby: 'Mindenki'
}