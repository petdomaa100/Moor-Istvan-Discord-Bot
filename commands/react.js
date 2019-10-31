const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    await message.delete();

    if(!args[0]) return message.channel.send('More, nem adtál meg egy emoji-t!').then((msg) => msg.delete(2500));

    message.channel.fetchMessages({ limit: 1 }).then(messages => {
        let emogjMessageArray = args[0].split(':');
        let msg = messages.array()[0];

        let EMOGJ;

        if(!emogjMessageArray[1]) {
            EMOGJ = args[0];
        } else {
            EMOGJ = emogjMessageArray[1];
        }

        let emogj = msg.guild.emojis.find(x => x.name == EMOGJ);

        if(!emogj) {
            return message.channel.send('Valami baj történt... Valószínűleg elcseszted az emogj nevét... Szokásosan...').then((msg) => msg.delete(2500));
        } 

        msg.react(emogj);
    });
}

module.exports.help = {
    name: 'react',
    noalias: 'Nincs rokona',
    aliases: [],
    usage: 'react <emoji neve>',
    description: 'Moór reagál az előző üzenetre a kiválasztott emojival.',
    accessableby: 'Mindenki'
}