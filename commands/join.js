const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(!message.member.voiceChannel) {
        let joinBad1 = new Discord.RichEmbed()
            .setTitle('Retaldált vagy!')
            .setDescription('Moór nem tud hozzád join-olni!')
            .setFooter('Benne kell hogy legyél egy Voice Channel-ben!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(joinBad1);
        return;
    }

    if(message.guild.voiceConnection) {
        let joinBad2 = new Discord.RichEmbed()
            .setTitle('Nyomorék vagy!')
            .setDescription('Moór már alapból benne van a szerver egyik VoiceChannel-ében!')
            .setFooter('Szerverenként csak 1-ben lehet!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(joinBad2);
        return;
    }

    message.member.voiceChannel.join().then(() => {
        let joinOutput = new Discord.RichEmbed()
            .setTitle('Itt vagyok!')
            .setDescription('DJ Moór inda house!')
            .setColor('0x008000')
            .setFooter('Zene, játék, házi, Moór mindent tud!')
            .setThumbnail('https://i.imgur.com/2J9IiuO.png')
        message.channel.send(joinOutput);
    });
}


module.exports.help = {
    name: 'join',
    aliases: ['gyere'],
    usage: 'join',
    description: 'Belép a bot abba a Voice Channel-be amiben vagy.',
    accessableby: 'Mindenki'
}