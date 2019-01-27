const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message) => {
    let user;

    if(message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const member = message.guild.member(user);

    let info = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(user.avatarURL)
        .setTitle(`**${user.bot == true ? `${user.username}-bot info**` : `${user.username} info**`}`)
        .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'Nincs'}`, true)
        .addField('Discord Tag:', user.tag, true)
        .addField('Státusz:', user.presence.status, true)
        .addField('Verified:', user.verified == true ? 'Igen' : 'Nem', true)
        .addField('Ezt játsza:', user.presence.game == 'Fortnite' ? 'Fortnite-os buzi' : user.presence.game || 'Semmit...' , true)
        .addField('User elkészült:', moment.utc(member.createdAt).locale('hu').format('YYYY MMMM DD'), true)
        .addField('User belépett:', moment.utc(member.joinedAt).locale('hu').format('YYYY MMMM DD'), true)
        .addField('Role-jai:', member.roles.map(roles => roles.name).slice(1).join(', ') || 'Ő olyan szerencsétlen, hogy role-ja.')
    message.channel.send(info);
}

module.exports.help = {
    name: 'userinfo',
    aliases: ['ui'],
    usage: 'userinfo <@user_neve#user_hashtag-e>',
    description: 'Alap info-t ad a megadott user-ről.',
    accessableby: 'Mindenki'
}