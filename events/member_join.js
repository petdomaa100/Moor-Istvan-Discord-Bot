const Discord = require('discord.js');

module.exports = (bot, member) => {
    let CHANNEL = member.guild.channels.find(channel => channel.id == '710478217294905354');
    let ROLE = member.guild.roles.find(role => role.name == 'Gyermekek');

    if(!CHANNEL.name) return;

    let welcomeMsg = new Discord.RichEmbed()
        .setTitle('Fasza')
        .setColor('RANDOM')
        .setDescription(`**${member.user.username}** megérkezett!`)
        .setTimestamp()
    CHANNEL.send(welcomeMsg);

    member.addRole(ROLE);
}