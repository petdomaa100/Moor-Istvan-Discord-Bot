const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message) => {
    let {body} = await superagent
        .get('https://random.dog/woof.json');

    let pre_message_dog  = await message.channel.send('Már keresek is egy kutyát...');

    
    let dogOutput = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage(body.url)
        .setFooter(bot.user.username + ' szereti a kutyákat.', bot.user.displayAvatarURL)
    message.channel.send(dogOutput);

    pre_message_dog.delete();
}

module.exports.help = {
    name: 'dog',
    aliases: ['kutya', 'doggo'],
    usage: 'dog',
    description: 'Küld egy random képet egy random kutyáról.',
    accessableby: 'Mindenki'
}