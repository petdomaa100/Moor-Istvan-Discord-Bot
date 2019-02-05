const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, prefix) => {
    const prefixJSON = require('../data/prefix.json');

    if(!prefixJSON.prefix) {
        let prefixBad1 = new Discord.RichEmbed()
            .setTitle('Ujjuj!')
            .setDescription('Valami nagyon nagy baj van!')
            .setFooter('Írd meg @petdomaa100-nak!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(prefixBad1);
        return;
    }

    if(!message.member.hasPermission('ADMINISTRATOR')) {
        let prefixBad1 = new Discord.RichEmbed()
            .setTitle('BUZI')
            .setDescription('Neked erre nincs engedélyed!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(prefixBad1);
        return;
    }

    if(!args[0]) {
        let prefixBad2 = new Discord.RichEmbed()
            .setTitle('Moór prefix-e')
            .setDescription(`Prefix: **${prefixJSON.prefix}**`)
            .setColor('#FF9900')
            .setFooter(`Prefix átállítása: ${prefix}prefix <új prefix ide>`)
        message.channel.send(prefixBad2);
        return;
    }

    if(args[0] == prefixJSON.prefix) {
        let prefixBad3 = new Discord.RichEmbed()
            .setTitle('Szerencsétlen vagy!')
            .setDescription(`A prefix már alapból: **${args[0]}**`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(prefixBad3);
        return;
    }

    let options = {
        "prefix": args[0]
    }
    
    fs.writeFile('../code/data/prefix.json', JSON.stringify(options, null, 4), (err) => {
        if(err) throw err;

        let prefixOutput = new Discord.RichEmbed()
            .setTitle('Prefix átállítva!')
            .setColor('#FF9900')
            .setDescription(`Új prefix: **${args[0]}**`)
        message.channel.send(prefixOutput);
    });

}

module.exports.help = {
    name: 'prefix',
    noalias: 'Nincs rokona',
    aliases: [],
    usage: 'prefix <úr prefix>',
    description: 'Átállítja a prefix-et.',
    accessableby: 'Adminok'
}