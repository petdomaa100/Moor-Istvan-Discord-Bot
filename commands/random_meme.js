const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message) => {
    let pre_message_meme  = await message.channel.send('Igenis Gordon Kapitány! már készítem is...');
    
    let {body} = await superagent
        .get('https://api-to.get-a.life/meme');

    if(!{body}) return message.channel.send('A server elbaszódott...')
    
    let randomMemeEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage(body.url)
        .setFooter(bot.user.username + ' szereti a meme-eket.', bot.user.displayAvatarURL)
    message.channel.send(randomMemeEmbed);

    pre_message_meme.delete();
}

module.exports.help = {
    name: 'meme',
    aliases: ['randommeme', 'random_meme'],
    usage: 'meme',
    description: 'Küld egy fincsi meme-et.',
    accessableby: 'Mindenki'
}