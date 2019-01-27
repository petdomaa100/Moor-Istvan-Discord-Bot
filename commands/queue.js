const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message, args, prefix) => {
    if(queue.length <= 0) {
        let queueBad1 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setDescription('Nem is megy semmilyen zene!')
            .setFooter(`Elindíthatsz egyet a ${prefix}play commandal.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(queueBad1);
        return;
    }
    
    if(args[0]) {
        let queueBad2 = new Discord.RichEmbed()
            .setTitle('Buzi!')
            .setDescription('Neked erre nincs engedélyed!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(queueBad2);
        return;
    }

    //console.log(queue);

    let lista = [];

    for (let i = 0; i < queue.length; i++) {
        const zene = queue[i];
        const song = await YTDL.getInfo(zene);

        lista.push(`${song.title.length > 55 ? song.title.substring(0, 55) + '...' : song.title} **[${TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss'))}]**`)
    }

    let queueOutput = new Discord.RichEmbed()
        .setTitle('__Lejátszási lista:__')
        .setDescription(`**${lista.length}db** zene van a lejátszási listában.\n\n` + lista.join('\n'))
        .setFooter('Moór remek DJ, de még van mit tanulnia.')
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(queueOutput);
}

module.exports.help = {
    name: 'queue',
    aliases: ['lejatszasi_lista', 'q'],
    usage: 'queue',
    description: 'Megmutatja a lejátszási listát.',
    accessableby: 'Mindenki'
}