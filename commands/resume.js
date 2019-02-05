const Discord = require('discord.js');

module.exports.run = async (bot, message) => {    
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        var resumeBad1 = new Discord.RichEmbed()
            .setTitle('Retardált!')
            .setDescription('Ezt így nem tudom megcsinálni!')
            .setFooter('Ugyan abban a Voice Channel-ben kell lenned mint Moór.')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(resumeBad1);
        return;
    }

    if(message.guild.dispatcher) {
        message.guild.dispatcher.resume();

        var resumeGood = new Discord.RichEmbed()
            .setTitle('Értettem!')
            .setDescription('Moór elindította a zenét!')
            .setFooter('Moór remek DJ, de azért még van mit tanulnia.')
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/DX0uSM6.png')
        message.channel.send(resumeGood);
        return;
    } else {
        var resumeBad2 = new Discord.RichEmbed()
            .setTitle('Nyomorék!')
            .setDescription('Nem is megy semmilyen zene!')
            .setFooter(`Berakhatsz egy csodás zenét a ${prefix}play <youtube link> commandal!`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(resumeBad2);
    }
}

module.exports.help = {
  name: 'resume',
  aliases: ['mehet'],
  usage: 'resume',
  description: 'Elindítja a megállított zenét.',
  accessableby: 'Mindenki'
}