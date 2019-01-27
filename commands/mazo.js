const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    number = 36;
    imgNumber = Math.floor(Math.random() * (number)) + 1;

    message.channel.send({files: [`./images/${imgNumber}.png`]});
}

module.exports.help = {
    name: 'mazo',
    aliases: ['mazo_img'],
    usage: 'mazo',
    description: 'Küld egy random képet M.',
    accessableby: 'Mindenki'
}