const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        var pauseBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('UserNotInVC'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(pauseBad1);
        return;
    }

    if(message.guild.dispatcher) {
        message.guild.dispatcher.pause();

        nowPlaying.title += ' `[PAUSED]` ';

        let pauseOutput = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('sikerEleje'))
            .setDescription(outputMessageRandomiser('!pauseSiker'))
            .setFooter(outputMessageRandomiser('sikerVege'))
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/5LXiGXC.png')
        message.channel.send(pauseOutput);
        return;
    } else {
        let pauseBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(pauseBad2);
    }
}

module.exports.help = {
  name: 'pause',
  aliases: ['állj'],
  usage: 'pause',
  description: 'Moór megállítja az aktuálisan játszó zenét.',
  accessableby: 'Mindenki'
}