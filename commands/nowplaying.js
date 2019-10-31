const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(nowPlaying == null) {
        let nowPlayingBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nowPlayingBad1);
        return;
    }
    let npOutput = new Discord.RichEmbed()
        .setTitle('__Now Playing:__')
        .setDescription(`${nowPlaying.title} **${nowPlaying.duration}**`)
        .setColor('RANDOM')
    message.channel.send(npOutput);
}

module.exports.help = {
    name: 'nowplaying',
    aliases: ['np'],
    usage: 'nowplaying',
    description: 'Moór megmutatja az épp játszó zenét.',
    accessableby: 'Mindenki'
}