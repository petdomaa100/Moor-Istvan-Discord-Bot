const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	if(!args[0]) {
		sayBad = new Discord.RichEmbed()
			.setTitle(outputMessageRandomiser('anyazasEleje'))
			.setDescription('Nem is adtad meg higy mit mondjak!')
			.setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
		message.channel.send(sayBad);
		return;
	}
	
	message.delete();
	message.channel.send(args.join(' '));
}

module.exports.help = {
  name: 'say',
  aliases: ['mond', 'szavald'],
  usage: 'say <amit ki szeretnél mondatni Moórral>',
  description: 'moór kimondja amit a command után írtál.',
  accessableby: 'Mindenki'
}