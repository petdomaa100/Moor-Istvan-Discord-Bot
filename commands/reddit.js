const Discord = require('discord.js');
const Nightmare = require('nightmare');
const cheerio = require('cheerio');

module.exports.run = async (bot, message) => {
    const nightmare = Nightmare();

    nightmare
        .goto('')
        .wait(2000)
        .evaluate(() => {
            return document.body.innerHTML;
        })
        .then((html) => {
            const $ = cheerio.load(html);
            return;
        });
}

module.exports.help = {
    name: 'reddit',
    aliases: ['pew'],
    usage: 'reddit',
    description: 'nem tom',
    accessableby: 'Mindenki'
}