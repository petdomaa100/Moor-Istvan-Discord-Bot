const Discord = require('discord.js');

module.exports = (member) => {
    let CHANNEL = member.guild.channels.find(channel => channel.id == '526037223196590080');
    let ROLE = member.guild.roles.find(role => role.name == 'Autista kukorica');

    if(!CHANNEL) return message.channel.send('Nem találtam **bejelentések-🔔** channel-t.');

    let welcomeMsg = new Discord.RichEmbed()
        .setTitle('YEEET!')
        .setColor('RANDOM')
        .setDescription(`**${member.user.username}** jött mulatni!`)
        .setTimestamp()
    CHANNEL.send(welcomeMsg);

    member.addRole(ROLE);
}