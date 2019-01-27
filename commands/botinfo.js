const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message) => {
    let botversion = ('6.0.0')
    
    let botInfo = new Discord.RichEmbed()
        .setTitle(`**${bot.user.username}-bot információja**`)
        .setColor('#cd00f2')
        .setThumbnail(bot.user.displayAvatarURL)
        .addField('Iskolai kötődésem:', 'Moór István a becses nevem, matek tanár vagyok. A **Budapesti Piarista Gimnáziumban** vagyok **Matek-Fizika** és **Hittan** tanár. A kedvenc férfias színem a *rózsaszín*, és szereteka *Legeza Álmosra* pikkelni.')
        .addBlankField()
        .addField('A mesterem elkészített:', moment.utc(bot.user.createdAt).locale('hu').format('YYYY MMMM DD'))
        .addField('Telefonszámom:', '+36 30 123 4567', true)
        .addField('Verzióm:', botversion, true)
        .addField('Becses ID-m:', bot.user.id, true)
        .addField('Discord Tag-em:', bot.user.tag, true)
        .setFooter('Jaj fiúk, ne kelljen találgatnom!')
        .setTimestamp()
    message.channel.send(botInfo);
}

module.exports.help = {
    name: 'botinfo',
    aliases: ['moorinfo', 'bi'],
    usage: 'botinfo',
    description: 'Alap info-t ad imádott Moórunkról.',
    accessableby: 'Mindenki'
}