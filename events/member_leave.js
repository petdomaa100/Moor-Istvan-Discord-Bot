const Discord = require('discord.js');

module.exports = (bot, member) => {
    let CHANNEL = member.guild.channels.find(channel => channel.id == '526037223196590080');

    if(!CHANNEL.name) return message.channel.send('Nem találtam **bejelentések-🔔** channel-t.');

    let leaveMsg = new Discord.RichEmbed()
        .setTitle('Tragédia!')
        .setColor('RANDOM')
        .setDescription(`**${member.user.username}** kilépett!`)
        .setFooter('Dögöljön meg!')
        .setTimestamp()
    CHANNEL.send(leaveMsg);
}