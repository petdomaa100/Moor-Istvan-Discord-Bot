const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    if(message.author.id != '346946719440830466') {
        message.delete();
        message.channel.send('Próbálkozz csak csicska!   lol').then((msg) => msg.delete(4000));
        return;
    }

    if(!message.mentions.users.first()) {
        message.delete();
        message.channel.send('Nem adtál meg egy áldozatot!').then((msg) => msg.delete(4000));
        return;
    }

    const aldozat = message.mentions.users.first();
    let reason;

    if(!args[1]) {
        reason = 'Nincs megadva.  lol';
    } else {
        reason = args.slice(1).join(' ');
    }

    found = false;

    if(blacklist.length > 0) {
        for (let i = 0; i < blacklist.length; i++) {
            if (blacklist[i].user == `${aldozat.username}#${aldozat.discriminator}`) {
                found = true;
                break;
            }
        }    
    }

    if(found == false) {
        message.delete();
        message.channel.send(`${aldozat} még nincs benne a **blacklist**-ben.`).then((msg) => msg.delete(4000));
        return;
    }

    let opcioLVLOutput = new Discord.RichEmbed()
        .setTitle('Megtaláltam!')
        .setDescription(`Biztos, szeretnéd hogy ${aldozat} levenni a feketelistáról?`)
        .setColor('RANDOM')
        .setFooter('Van 5 másodperced! (Y/N)')
    var opcioLVLOutputMSG = await message.channel.send(opcioLVLOutput);

    try {
        var opcio = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg == 'Y' || msg == 'N', { max: 1, time: 5000, errors: ['time'] });
    } catch (error) {
        message.delete();
        opcioLVLOutputMSG.delete();
        message.reply('Lejárt az idő.').then((msg) => msg.delete(3000));
        return;
    }
    
    const valasz = opcio.first().content;

    opcioLVLOutputMSG.delete();
    message.delete();
    opcio.first().delete();

    if(valasz == 'N') return message.channel.send('Kérelem eldobva...').then((msg) => msg.delete(3000));
    
    blacklistRemove = function(aldozat, reason, i) {
        const USER = blacklist[i];

        if(!USER) return;

        blacklist.splice(i, 1);
    
        let blacklistOutout = new Discord.RichEmbed()
            .setTitle('Feketelista!')
            .setDescription(`Kivettem ${aldozat}, a feketelistáról!`)
            .addField('Büntetés oka', USER.reason, true)
            .addField('Levétel Oka', reason, true)
            .addField('Büntetés szinte', USER.lvl, true)
            .addField('Feltevés időpontja', USER.added, true)
            .addField('Levétel időpontja', moment.utc(new Date()).locale('hu').format('YYYY MMMM DD'), true)
            .setFooter('Én a helyében még mindíg félnék!')
            .setTimestamp()
            .setColor('RANDOM')
        message.channel.send(blacklistOutout);   

    }

    for (let i = 0; i < blacklist.length; i++) {
        if(blacklist[i].user == `${aldozat.username}#${aldozat.discriminator}`) {
            await blacklistRemove(aldozat, reason, i);
            break;
        }
    }
}

module.exports.help = {
    name: 'blacklistremove',
    aliases: ['blr'],
    usage: 'blacklistremove',
    description: 'Ne akard tudni. xD',
    accessableby: 'Domi'
}