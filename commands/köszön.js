const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let Args = args.join(' ').toLowerCase();
    
    if(Args == 'módok') {
        var modok = new Discord.RichEmbed()
            .setColor('#ff9900')
            .setAuthor('Köszönési módok')
            .setDescription('- Laudetur Jesus Christus \n- Jónapot kívánok.')
        message.channel.send(modok);
        return;
    }

    if(Args == 'laudetur jesus christus') {
        message.channel.send('Ineterum Amen.');
        return;
    }

    if(Args == 'jónapot kívánok') {
        message.channel.send('Jónapot kívánok.');
        return;
    } else {
        message.channel.send('Ez a köszönés igy helytelen! Erről holnap elbeszélgetünk az irodámban!');
        return;
    }
}


module.exports.help = {
    name: 'köszön',
    noalias: 'Nincs rokona.',
    aliases: [],
    usage: 'köszön <köszönés>',
    description: 'Moór illedelmesen válaszol a jólnevelt diákoknak',
    accessableby: 'Mindenki'
}