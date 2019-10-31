const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    message.channel.send('Számolom...').then((msg) => {
        let pingOutput = new Discord.RichEmbed()
            .setTitle('Moór kiszámolta!')
            .setColor('#FF9900')
            .setDescription(`__Ping:__  **${msg.createdTimestamp - message.createdTimestamp}ms** \n__Latency:__ **${Math.round(bot.ping)}ms.**`)
            .setFooter('Moór egy matek tanár, ezért jól számol.')
        msg.edit(pingOutput);
    });
}

module.exports.help = {
    name: "ping",
    noalias: "Nincs rokona.",
    aliases: [],
    usage: `ping`,
    description: `Moór megmutatja a ping-jét.`,
    accessableby: "Mindenki"
}