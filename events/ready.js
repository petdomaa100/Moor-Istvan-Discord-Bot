const Discord = require('discord.js');
const prefixJSON = require('../data/prefix.json');

module.exports = async (bot) => {
    console.log('mef');

    let prefix = prefixJSON.prefix;

    let statuszok = [
        `${prefix}help`,
        'Forgatás definíciója',
        'Zokniszabály',
        'Aranyérkenőcs',
        'Baszatáska',
    ];
  
    setInterval(function() {
        let status = statuszok[Math.floor(Math.random() * statuszok.length)];
        bot.user.setActivity(status, { type: "PLAYING" });
    }, 5000);

    setInterval(function() {
        if(blacklist.length >= 1) {
            for (let i = 0; i < blacklist.length; i++) {
                const aldozat = blacklist[i];
                
                Death(aldozat, i);
            }
        }
    }, 2000);

    //bot.user.setAvatar(botconfig.moor_avatar);

    bot.user.setStatus('Online');
}