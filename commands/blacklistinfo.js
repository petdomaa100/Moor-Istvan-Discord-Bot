const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    if(message.author.id != '346946719440830466') {
        message.delete();
        message.channel.send('Próbálkozz csak csicska!   lol').then((msg) => msg.delete(4000));
        return;
    }

    if(blacklist.length < 1) {
        message.delete();
        message.reply('bocs, még sinki sincs a feketelistán.').then((msg) => msg.delete(3000));
        return;
    }

    function viewBlacklist(aldozat) {
        const USER = aldozat;

        let blacklistInfoOutput1 = new Discord.RichEmbed()
            .setAuthor('Feketelista Információ!')
            .addField('User', USER.user, true)
            .addField('Büntetés Oka', USER.reason, true)
            .addField('Büntetés Szintje', USER.lvl, true)
            .addField('Büntetés időpontja', USER.added, true)
            .setColor('RANDOM')
            .setThumbnail(USER.avatar)
            .setFooter('Dögöljön meg!')
            .setTimestamp()
        message.channel.send(blacklistInfoOutput1);
    }

    if(message.mentions.users.first()) {
        const aldozat = message.mentions.users.first();

        for (let i = 0; i < blacklist.length; i++) {
            if(blacklist[i].user == `${aldozat.username}#${aldozat.discriminator}`) {
                viewBlacklist(blacklist[i]);
                break;
            }
        }
    } else {
        let nev = [];
        let LVL = [];
        let ADDED = [];

        for (let i = 0; i < blacklist.length; i++) {
            const USER = blacklist[i];

            nev.push(USER.user);
            LVL.push(USER.lvl);
            ADDED.push(USER.added);
        }

        let blacklistInfoOutput2 = new Discord.RichEmbed()
            .setTitle('Feketelista Információ')
            .setColor('RANDOM')
            .setDescription(`A Feketelistán **${blacklist.length}db** áldozat van. \xa0\xa0 :)`)
            .addBlankField()
            .addField('__Név:__', nev.join('\n\n'), true)
            .addField('__Büntetése Szintje:__', LVL.join('\n\n'), true)
            .addField('__Hozzáadva:__', ADDED.join('\n\n'), true)
            .setTimestamp()
            .setFooter('FÉLJENEK A PATKÁNYOK!')
        message.channel.send(blacklistInfoOutput2);
    }
}

module.exports.help = {
    name: 'blacklistinfo',
    aliases: ['bli', 'blv'],
    usage: 'blacklistinfo',
    description: 'Ne akard tudni. xD',
    accessableby: 'Domi'
}