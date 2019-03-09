const Discord = require('discord.js');
const prefixJSON = require('../data/prefix.json');
const prefix = prefixJSON.prefix;

module.exports.run = async (bot, message) => {
    if(!message.attachments.first()) {
        let seasonalSkinBad1 = new Discord.RichEmbed()
            .setTitle('Szerencsétlen vagy!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setDescription('Nem tudok átöltözni, mert nem mutattad, hogy mire!')
            .setFooter(`Helyes kód: tölts fel egy képet, majd az "Add Comment" részen bellül: ${prefix}seasonal_skin.`)
        message.channel.send(seasonalSkinBad1);
        return;
    }

    error = false;
    
    avatarImg = message.attachments.first().url;

    var pre_MSG = await message.channel.send('*Csak egy pillanat...*');

    await bot.user.setAvatar(avatarImg).catch((err) => {
        if(err.message.includes('You are changing your avatar too fast.')) {
            var seasonalSkinBad2 = new Discord.RichEmbed()
                .setTitle('Szerencsétlen vagy!')
                .setColor('0xFF0000')
                .setThumbnail('https://i.imgur.com/Lgekz3D.png')
                .setDescription('10 percenként ezt csak **1x** tudok átöltözni!')
            pre_MSG.delete();
            message.channel.send(seasonalSkinBad2);

            error = true;
        }
    });

    if(error == true) return;

    let seasonalSkinOutput = new Discord.RichEmbed()
        .setTitle('Átöltöztem!')
        .setColor('RANDOM')
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription('Hogy festek?')
    pre_MSG.delete();
    message.channel.send(seasonalSkinOutput);
}

module.exports.help = {
    name: 'seasonal_skin',
    p_usage: `Tölts fel egy képet, majd az "Add Comment" részen bellül írd be: ${prefix}seasonal_skin.`,
    description: 'Moór átöltözik az új trendy öltözékébe.',
    accessableby: 'Mindenki'
}