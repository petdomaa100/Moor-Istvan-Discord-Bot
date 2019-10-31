const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(queue.length <= 0) {
        let clearQueueBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearQueueBad1);
        return;
    }
    
    if(args[0]) {
        if(isNaN(args[0]) || args[0] > queue.length || args[0] < 1) {
            let removeQueuebad1 = new Discord.RichEmbed()
                .setTitle(outputMessageRandomiser('anyazasEleje'))
                .setDescription(outputMessageRandomiser('!qr_args-invalid'))
                .setFooter(outputMessageRandomiser('anyazasVege'))
                .setColor('#f15a35')
                .setTimestamp()
            message.channel.send(removeQueuebad1);
            return;
        }

        queue.splice(args[0] - 1, 1)

        let removeQueueOutput = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('sikerEleje'))
            .setDescription(outputMessageRandomiser('!qrSiker'))
            .setFooter(outputMessageRandomiser('sikerVege'))
            .setColor('#f15a35')
            .setTimestamp()
        message.channel.send(removeQueueOutput);
    } else {
        let removeQueuebad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('!qr-noArgs'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('#f15a35')
            .setTimestamp()
        message.channel.send(removeQueuebad2);
    }
}

module.exports.help = {
    name: 'queueremove',
    aliases: ['removequeue', 'qremove', 'qr', 'rq'],
    usage: 'queueremove <zene száma>',
    description: 'Moór kiveszi a megadott zenét a lejátszási listából.',
    accessableby: 'Mindenki'
}