const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(queue.length <= 0) {
        let clearQueueBad1 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setDescription('Nincs is lejátszási lista!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearQueueBad1);
        return;
    }
    
    queue.length = 0;

    let clearQueueOutput2 = new Discord.RichEmbed()
        .setTitle('Lejátszási lista törölve!')
        .setDescription('Moór kitörölte a lejátszási listát.')
        .setFooter(`Lejátszási lista hossza: ${queue.length}`)
        .setColor('#f15a35')
        .setTimestamp()
    message.channel.send(clearQueueOutput2);
}

module.exports.help = {
    name: 'clearqueue',
    aliases: ['clearquue', 'cq', 'clearq', 'cqueue', 'qc'],
    usage: 'clearqueue',
    description: 'Kitörli az aktuális lejátszási listát.',
    accessableby: 'Mindenki'
}