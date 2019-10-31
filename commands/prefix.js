const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, prefix, prefixJSON) => {
    if(!prefixJSON.prefix) {
        let prefixBad1 = new Discord.RichEmbed()
            .setTitle('Ujjuj!')
            .setDescription('Valami nagyon nagy baj van!')
            .setFooter('Írd meg @petdomaa100-nak!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(prefixBad1).then((msg) => msg.delete(2500));
        message.delete(2500);
        return;
    }

    console.log(message.author.id);

    if(!message.author.id != '346946719440830466') {
        let prefixBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noPermission'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(prefixBad1);
        return;
    }

    if(!args[0]) {
        let prefixBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('!prefix-noArgs'))
            .setColor('#FF9900')
            .setFooter(outputMessageRandomiser('anyazasVege'))
        message.channel.send(prefixBad2);
        return;
    }

    if(args[0] == prefixJSON.prefix) {
        let prefixBad3 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('!prefix-prefixIsTheSame'))
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
            .setFooter(outputMessageRandomiser('sikerVege'))
        message.channel.send(prefixOutput);
    });

}

module.exports.help = {
    name: 'prefix',
    noalias: 'Nincs rokona',
    aliases: [],
    usage: 'prefix <úr prefix>',
    description: 'Moór átállítja a prefix-ét.',
    accessableby: '@petdomaa100'
}