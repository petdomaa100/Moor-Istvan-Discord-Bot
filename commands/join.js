const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(!message.member.voiceChannel) {
        let joinBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('!join-userNotInChannel'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(joinBad1);
        return;
    }

    if(message.guild.voiceConnection) {
        let joinBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription('Moór már alapból benne van a szerver egyik VoiceChannel-ében!')
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(joinBad2);
        return;
    }

    message.member.voiceChannel.join();

    let joinOutput = new Discord.RichEmbed()
        .setTitle(outputMessageRandomiser('sikerEleje'))
        .setDescription(outputMessageRandomiser('!joinSiker'))
        .setColor('0x008000')
        .setFooter(outputMessageRandomiser('!joinSikerVege'))
        .setThumbnail('https://i.imgur.com/2J9IiuO.png')
    message.channel.send(joinOutput);
}


module.exports.help = {
    name: 'join',
    aliases: ['gyere'],
    usage: 'join',
    description: 'Moór belép abba a Voice Channel-be, amiben vagy.',
    accessableby: 'Mindenki'
}