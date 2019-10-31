const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message) => {
    var images = [];
    
    fs.readdir('./images/', (err, files) => {
        if(err) console.log(err);

        files.forEach((img) => {
            images.push(img);
        });

        message.channel.send({files: [`./images/${images[Math.floor(Math.random() * images.length)]}`]});
    });
}

module.exports.help = {
    name: 'mazo',
    noalias: 'Nincs rokona',
    aliases: [],
    usage: 'mazo',
    description: 'Küld egy fincsi képet Mazó-rol.',
    accessableby: 'Mindenki'
}