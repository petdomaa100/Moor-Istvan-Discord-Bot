const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first());

    if(!rUser) {
        reportBad= new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('!report-noUser'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(reportBad);
        return;
    }

    let reason = args.slice(1).join(' ');

    if(reason == '' || reason == undefined) reason = 'Nincs megadva.';

    const CHANNEL = message.guild.channels.find(channel => channel.id == '710478217294905354');
    if(!CHANNEL) return message.channel.send('Nem találtam meg a **reportok-⛔** channel-t.').then((msg) => msg.delete(2500));

    let reportPreOutput = new Discord.RichEmbed()
        .setTitle(outputMessageRandomiser('sikerEleje'))
        .setColor('#ff0000')
        .setDescription(`A report megtekinthető a **${CHANNEL.name}** text channel-ben.`)
        .setFooter('sikerVege')
        .setTimestamp()
    message.channel.send(reportPreOutput);
    
    let reportOutput = new Discord.RichEmbed()
        .setTitle('Csúnya viselkedés!')
        .setColor('#ff0000')
        .setThumbnail('https://i.imgur.com/mQ3h6R7.png')
        .setDescription(`${message.author} beköpte ${rUser}-t. Ezért most \nMoór mindkettőjüket kiküldi a teremből!`)
        .addField('Oka: ', reason)
        .setTimestamp()
    CHANNEL.send(reportOutput);
}

module.exports.help = {
    name: 'report',
    aliases: ['beköp'],
    usage: 'report <@reportoladó személy> <report oka>',
    description: 'Reportolja a kivánt személyt.',
    accessableby: 'Mindenki'
}