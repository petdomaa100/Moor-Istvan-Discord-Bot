const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    let serverInfo = new Discord.RichEmbed()
        .setTitle('**Szerver információ**')
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Összes mulató száma: **${message.guild.memberCount}**`)
        .addField('Szerver neve:', message.guild.name, true)
        .addField('Szerver ID:', message.guild.id, true)
        .addField('Mulatók vezetője:', message.guild.owner.user.username, true)
        .addField('Verification Level:', message.guild.verificationLevel, true)
        .addField('Régió:', message.guild.region, true)
        .addField('Elkészült:', moment.utc(message.guild.createdAt).locale('hu').format('YYYY MMMM DD'), true)
        .addField('Role-ok:', message.guild.roles.map(roles => roles.name).slice(1).join(', '))
        .setFooter('Ez a szerver kizárólag saját felelősséggel használható! **cringe warning**')
        .setTimestamp()
    message.channel.send(serverInfo);
}

module.exports.help = {
    name: 'serverinfo',
    usage: 'serverinfo',
    description: 'Alap info-t ad a szerverről.',
    aliases: ['si'],
    accessableby: 'Mindenki'
}