const Discord = require('discord.js');

module.exports = (bot, member) => {
    let CHANNEL = member.guild.channels.find(channel => channel.id == '526037223196590080');

    if(!CHANNEL.name) return;

    let leaveMsg = new Discord.RichEmbed()
        .setTitle('Gecc')
        .setColor('RANDOM')
        .setDescription(`**${member.user.username}** lelépett...`)
        .setFooter(':(')
        .setTimestamp()
    CHANNEL.send(leaveMsg);
}