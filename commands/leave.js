const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.guild.voiceConnection) {
        message.guild.voiceConnection.disconnect();

        var leaveGood = new Discord.RichEmbed()
            .setTitle('Elmentem.')
            .setDescription('Moór hazament.')
            .setColor('0x008000')
            .setFooter('Valószínűleg dolgozatokat javít.')
            .setThumbnail('https://i.imgur.com/GYLlQqW.png')
        message.channel.send(leaveGood);
    } else {
        var leaveBad = new Discord.RichEmbed()
            .setTitle('Elbasztad!')
            .setDescription('Moór nincs benne semmilyen Voice Channel-ben!')
            .setFooter('Benne kell hogy legyen Moór egy Voice Channel-ben mielőtt elküldöd!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(leaveBad);
    }
}

module.exports.help = {
    name: 'leave',
    aliases: ['disconnect', 'stop', 'menj_el'],
    usage: 'leave',
    description: 'Kilép a bot abból a Voice Channel-ből amiben van.',
    accessableby: 'Mindenki'
}