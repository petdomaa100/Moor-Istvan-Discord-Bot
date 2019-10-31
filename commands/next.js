const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        var nextBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('UserNotInVC'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nextBad1);
        return;
    }
    
    if(message.guild.dispatcher) {
        message.guild.dispatcher.end();

        var nextGood = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('sikerEleje'))
            .setDescription(outputMessageRandomiser('!nextSiker'))
            .setFooter(outputMessageRandomiser('sikerVege'))
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/JCBGbiw.png')
        message.channel.send(nextGood);
    } else {
        var nextBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setFooter(outputMessageRandomiser('AnyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nextBad2);
    }
}
module.exports.help = {
    name: 'next',
    aliases: ['skip'],
    usage: 'next',
    description: 'Moór átugorja az épp jétszó zenét.',
    accessableby: 'Mindenki'
}