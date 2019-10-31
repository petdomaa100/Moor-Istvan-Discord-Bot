const Discord = require('discord.js');

module.exports.run = async (bot, message) => {    
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
            let resumeBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('UserNotInVC'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(resumeBad1);
        return;
    }

    if(message.guild.dispatcher) {
        message.guild.dispatcher.resume();

        nowPlaying.title = nowPlaying.title.substring(0, nowPlaying.title.length - 11);

        let resumeGood = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('sikerEleje'))
            .setDescription(outputMessageRandomiser('!resumeSiker'))
            .setFooter(outputMessageRandomiser('sikerVege'))
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/DX0uSM6.png')
        message.channel.send(resumeGood);
        return;
    } else {
        let resumeBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
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