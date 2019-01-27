const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first());

    if(!rUser) return message.channel.send('Nem adtál meg egy felhasználót.');

    let reason = args.slice(1).join(' ');

    let CHANNEL = message.guild.channels.find('id', '519174976927170581');
    if(!CHANNEL) return message.channel.send('Nem találtam meg a **reportok-⛔** channel-t.');

    let preReportEmbed = new Discord.RichEmbed()
        .setTitle('Értettem!')
        .setColor('#ff0000')
        .setDescription(`A report megtekinthető a **${CHANNEL.name}** text channel-ben.`)
        .setTimestamp()
    message.channel.send(preReportEmbed);
    
    let reportEmbed = new Discord.RichEmbed()
        .setTitle('Csúnya viselkedés!')
        .setColor('#ff0000')
        .setThumbnail('https://i.imgur.com/mQ3h6R7.png')
        .setDescription(`${message.author} beköpte ${rUser}-t. Ezért most \nMoór mindkettőjüket kiküldöm a teremből!`)
        .addField('Oka: ', reason)
        .setTimestamp()
    CHANNEL.send(reportEmbed);
}

module.exports.help = {
    name: 'report',
    aliases: ['beköp'],
    usage: 'report <@reportoladó személy> <report oka>',
    description: 'Reportolja a kivánt személyt.',
    accessableby: 'Mindenki'
}