const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(!message.attachments.first()) {
        let seasonalSkinBad1 = new Discord.RichEmbed()
            .setTitle('Szerencsétlen vagy!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setDescription('Nem tudok átöltözni, mert nem mutattad, hogy mire!')
            .setFooter(`Helyes kód: tölts fel egy képet, majd az "Add Comment" részen bellül: ${prefix}seasonal_skin.`)
        message.channel.send(seasonalSkinBad1);
        return;
    } else {
        avatarImg = message.attachments.first().url;

        try {
            bot.user.setAvatar(avatarImg).then(() => {
                let seasonal_skin_good = new Discord.RichEmbed()
                    .setTitle('Átöltöztem!')
                    .setColor('#0b16aa')
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setDescription('Hogy festek?')
                message.channel.send({embed: seasonal_skin_good});
            });

            console.log(`Bot's avatar has been changed: ${new Date()}.`);
        } catch (error) {
            if(error.message == 'Error:') {
                let seasonalSkinBad2 = new Discord.RichEmbed()
                    .setTitle('Szerencsétlen vagy!')
                    .setColor('0xFF0000')
                    .setThumbnail('https://i.imgur.com/Lgekz3D.png')
                    .setDescription('10 percenként ezt csak **1x** tudok átöltözni!')
                message.channel.send(seasonalSkinBad2);
                return;
            }
        }
    }    
}

module.exports.help = {
    name: 'seasonal_skin',
    noalias: 'Nincs rokona.',
    aliases: [],
    usage: `Tölts fel egy képet, majd az "Add Comment" részen bellül: seasonal_skin.`,
    description: 'Moór átöltözik az új trendy öltözékébe.',
    accessableby: 'Mindenki'
}