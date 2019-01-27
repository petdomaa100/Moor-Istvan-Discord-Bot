const Discord = require('discord.js');
const fs = require('fs');
const prefixJSON = require('../data/prefix.json');

module.exports.run = async (bot, message, args, prefix) => {
    if(!prefixJSON) {
        let prefixBad1 = new Discord.RichEmbed()
            .setTitle('BUZI!')
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
            .setTitle('Szerencsétlen vagy!')
            .setDescription('Nem tudom átállítani az új prefixet semmire!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setFooter(`Helyes kód: ${prefix}prefix <új prefix ide>`)
        message.channel.send(prefixBad2);
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