const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(message.guild.voiceConnection) {
        message.guild.voiceConnection.disconnect();
        
        nowPlaying = null;
        queue.length = 0;

        let leaveGood = new Discord.RichEmbed()
            .setTitle('Elmentem.')
            .setDescription(outputMessageRandomiser('!leaveSiker'))
            .setColor('0x008000')
            .setFooter(outputMessageRandomiser('sikerVege'))
            .setThumbnail('https://i.imgur.com/GYLlQqW.png')
        message.channel.send(leaveGood);
    } else {
        let leaveBad = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('!leave-moorNotInChannel'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(leaveBad);
    }
}

module.exports.help = {
    name: 'leave',
    aliases: ['disconnect', 'stop', 'takarodj', 'fuckoff'],
    usage: 'leave',
    description: 'Moór kilép a Voice Channel-ből amiben van.',
    accessableby: 'Mindenki'
}