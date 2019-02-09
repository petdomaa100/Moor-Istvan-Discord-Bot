const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!args[0]) {          
        message.channel.send('Számolom...').then((msg) => {
            let pingOutput = new Discord.RichEmbed()
                .setTitle('Kiszámoltam!')
                .setColor('#FF9900')
                .setDescription(`__Ping:__  **${msg.createdTimestamp - message.createdTimestamp}ms** \n__Latency:__ **${Math.round(bot.ping)}ms.**`)
            msg.edit(pingOutput);
    });
    } else {
        message.channel.send(`Csak simán írd be, hogy **${prefix}ping**!`)
    }
}

module.exports.help = {
    name: "ping",
    noalias: "Nincs rokona.",
    aliases: [],
    usage: `ping`,
    description: `Megmutatja Moór ping-jét.`,
    accessableby: "Mindenki"
}