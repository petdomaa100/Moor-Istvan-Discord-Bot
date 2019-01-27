const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let channel = message.guild.channels.get(message.channel.id);

    if(!args[0]) return message.channel.send('More, nem adtál meg egy emoji-t!');

    await message.delete();

    channel.fetchMessages({ limit: 1 }).then(messages => {
        let msg = messages.array()[0];
        let emogj = msg.guild.emojis.find(x => x.name == args[0]);

        msg.react(emogj);    
    });

}

module.exports.help = {
    name: 'react',
    aliases: ['reagálj'],
    usage: 'react <emoji neve>',
    description: 'Reagál az előző üzenetre a kiválasztott emojival.',
    accessableby: 'Mindenki'
}