const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(queue.length <= 0) {
        let clearQueueBad1 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setDescription('Nincs is semmilyen lejátszási lista!')
            .setFooter(`Elindíthatsz egyet a ${prefix}play command-al.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearQueueBad1);
        return;
    }
    
    if(args[0]) {
        if(isNaN(args[0]) || args[0] > queue.length || args[0] < 1) {
            let removeQueuebad1 = new Discord.RichEmbed()
                .setTitle('Fogyatékos!')
                .setDescription('Moór így nem tudja ezt megcsinálni.')
                .setFooter('Add meg a kitörlendő zene számát!')
                .setColor('#f15a35')
                .setTimestamp()
            message.channel.send(removeQueuebad1);
            return;
        }

        queue.splice(args[0]-1, 1)

        let removeQueueOutput1 = new Discord.RichEmbed()
            .setTitle('Zene eltávolitva!')
            .setDescription('Moór eltávolította a zenét lejátszási listából.')
            .setFooter('Lejátszási lista hossza: ' + queue.length)
            .setColor('#f15a35')
            .setTimestamp()
        message.channel.send(removeQueueOutput1);
    } else {
        let removeQueuebad2 = new Discord.RichEmbed()
            .setTitle('Fogyatékos!')
            .setDescription('Moór így nem tudja ezt megcsinálni.')
            .setFooter('Add meg a kitörlendő zene számát!')
            .setColor('#f15a35')
            .setTimestamp()
        message.channel.send(removeQueuebad2);
    }
}

module.exports.help = {
    name: 'queueremove',
    aliases: ['removequeue', 'qremove', 'queuer', 'qr'],
    usage: 'queueremove <zene száma>',
    description: 'Kiveszi a megadott zenét a lejátszási listából.',
    accessableby: 'Mindenki'
}