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
    
    if(args[0]) {
        if(isNaN(args[0]) || args[0] > queue.length || args[0] < 1) {
            
            return;
        }

        queue.splice(args[0]-1, 1)

        let clearQueueOutput1 = new Discord.RichEmbed()
            .setTitle('Zene eltávolitva!')
            .setDescription('Moór eltávolította a zenét lejátszási listából.')
            .setFooter('Moór jó DJ, de van még van mit tanulnia.')
            .setColor('#f15a35')
            .setTimestamp()
        message.channel.send(clearQueueOutput1);
    } else {
        queue.length = 0;

        let clearQueueOutput2 = new Discord.RichEmbed()
            .setTitle('Lejátszási lista törölve!')
            .setDescription('Moór kitörölte a lejátszási listát.')
            .setFooter(`Lejátszási lista hossza: ${queue.length}`)
            .setColor('#f15a35')
            .setTimestamp()
        message.channel.send(clearQueueOutput2);
    }
}

module.exports.help = {
    name: 'clearqueue',
    aliases: ['clearquue', 'cq', 'clearq', 'cqueue', 'queueremove', 'qremove', 'queuer', 'qr'],
    usage: 'queue',
    description: 'Kitörli az aktuális lejátszási listát/Kiveszi a megadott zenét a lejátszási listából.',
    accessableby: 'Mindenki'
}