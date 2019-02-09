const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        var pauseBad1 = new Discord.RichEmbed()
            .setTitle('Retardált!')
            .setDescription('Ezt így nem tudom megcsinálni!')
            .setFooter('Ugyan abban a Voice Channel-ben kell lenned mint Moór.')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(pauseBad1);
        return;
    }

    if(message.guild.dispatcher) {
        message.guild.dispatcher.pause();

        nowPlaying.title += ' `[PAUSED]` ';

        let pauseOutput = new Discord.RichEmbed()
            .setTitle('Értettem!')
            .setDescription('Moór megállította a zenét!')
            .setFooter('Moór remek DJ, de azért még van mit tanulnia.')
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/5LXiGXC.png')
        message.channel.send(pauseOutput);
        return;
    } else {
        let pauseBad2 = new Discord.RichEmbed()
            .setTitle('Retardált!')
            .setDescription('Nem is megy semmilyen zene!')
            .setFooter(`Berakhatsz egy csodás zenét a ${prefix}play <youtube link> commandal!`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(pauseBad2);
    }
}

module.exports.help = {
  name: 'pause',
  aliases: ['állj'],
  usage: 'pause',
  description: 'Megállítja az aktuálisan játszó zenét.',
  accessableby: 'Mindenki'
}