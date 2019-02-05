const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(nowPlaying == null) {
        let nowPlayingBad1 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setDescription('Nem is megy semmilyen zene!')
            .setFooter(`Elindíthatsz egyet a ${prefix}play commandal.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nowPlayingBad1);
        return;
    }
    let npOutput = new Discord.RichEmbed()
        .setTitle('Now Playing:')
        .setDescription(`${nowPlaying.title} **${nowPlaying.duration}**`)
        .setColor('RANDOM')
    message.channel.send(npOutput);
}

module.exports.help = {
    name: 'nowplaying',
    aliases: ['np'],
    usage: 'nowplaying',
    description: 'Megmutatja az épp játszó zenét.',
    accessableby: 'Mindenki'
}