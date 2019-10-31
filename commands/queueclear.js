const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(queue.length <= 0) {
        let clearQueueBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setDescription(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearQueueBad1);
        return;
    }
    
    queue.length = 0;

    let clearQueueOutput2 = new Discord.RichEmbed()
        .setTitle(outputMessageRandomiser('sikerEleje'))
        .setDescription(outputMessageRandomiser('!clearqueueSiker'))
        .setFooter(outputMessageRandomiser('sikerVege'))
        .setColor('#f15a35')
        .setTimestamp()
    message.channel.send(clearQueueOutput2);
}

module.exports.help = {
    name: 'clearqueue',
    aliases: ['clearquue', 'cq', 'clearq', 'cqueue', 'qc'],
    usage: 'clearqueue',
    description: 'Moór kitörli az aktuális lejátszási listát. (Az épp játszó zenét nem érinti)',
    accessableby: 'Mindenki'
}