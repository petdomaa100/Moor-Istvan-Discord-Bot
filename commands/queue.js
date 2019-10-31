const Discord = require('discord.js');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message) => {
    if(nowPlaying == null) {
        let queueBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(queueBad1);
        return;
    }

    var idotartam = parseInt(nowPlaying.lengthInSec);

    let lista = [];

    for (let i = 0; i < queue.length; i++) {
        const song = queue[i];
        const sorszam = i + 1;

        if(!isNaN(song.lengthInSec)) idotartam += parseInt(song.lengthInSec);

        lista.push(`\xa0\xa0 **${sorszam}) - ** ${song.title.length > 40 ? song.title.substring(0, 40) + '...' : song.title} **${song.duration}**`)
    }

    let queueOutput = new Discord.RichEmbed()
        .setTitle(queue.length >= 1 ? 'Lejátszási lista:' : 'Now Playing:')
        .setDescription(queue.length >= 1 ? `**${lista.length}db** zene van a lejátszási listában. \n\n__Now Playing:__ \n\n ${nowPlaying.title} **${nowPlaying.duration}** \n\n __Lejátszási Lista:__ \n\n${lista.join('\n\n')} ${queue.length >= 1 ? `\n\n__Összesen:__ **[${TimeFormat.fromS(parseInt(idotartam), 'mm:ss')}]**` : ''}` : `${nowPlaying.title} **${nowPlaying.duration}**`)
        .setFooter(queue.length >= 1 ? outputMessageRandomiser('sikerVege') : '')
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(queueOutput);
}

module.exports.help = {
    name: 'queue',
    aliases: ['q'],
    usage: 'queue',
    description: 'Moór megmutatja a lejátszási listát.',
    accessableby: 'Mindenki'
}