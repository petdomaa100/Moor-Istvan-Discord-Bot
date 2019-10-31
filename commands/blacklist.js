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

    if (found == true) {
        message.delete();
        message.channel.send(`${aldozat} már alapból benne van a **blacklist**-ben.`).then((msg) => msg.delete(4000));
        return;
    }

    let opcioLVLOutput = new Discord.RichEmbed()
        .setTitle('Válassz!')
        .setDescription('Válaszd ki a büntetés szintjét.')
        .setColor('RANDOM')
        .setFooter('Van 5 másodperced!')
    var opcioLVLOutputMSG = await message.channel.send(opcioLVLOutput);

    try {
        var opcio = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && !isNaN(msg) && msg >= 1 && msg <= 3, { max: 1, time: 5000, errors: ['time'] });
    } catch (error) {
        message.delete();
        opcioLVLOutputMSG.delete();
        message.reply('Lejárt az idő.').then((msg) => msg.delete(3000));
        return;
    }
    
    const LEVEL = opcio.first().content;

    opcioLVLOutputMSG.delete();
    message.delete();
    opcio.first().delete();
    
    blacklistAdd = function(aldozat, reason) {

        let obj = {
            user: `${aldozat.username}#${aldozat.discriminator}`,
            lvl: parseInt(LEVEL),
            added: moment.utc(new Date()).locale('hu').format('YYYY MMMM DD'),
            reason: reason,
            avatar: aldozat.avatarURL,
            guildID: message.guild.id
        }
    
        blacklist.push(obj);
    
        let blacklistOutout = new Discord.RichEmbed()
            .setTitle('Feketelista!')
            .setDescription(`Hozzáadtam ${aldozat}, a feketelistához! \n\n __Oka:__ \n${reason} \n\n__Szintje:__ ${LEVEL} \n\n__Időpont:__ ${moment.utc(new Date()).locale('hu').format('YYYY MMMM DD')}`)
            .setFooter('Én a helyében félnék!')
            .setTimestamp()
            .setColor('RANDOM')
        message.channel.send(blacklistOutout);   

    }
    
    await blacklistAdd(aldozat, reason);
}

module.exports.help = {
    name: 'blacklist',
    aliases: ['bl'],
    usage: 'blacklist',
    description: 'Ne akard tudni. xD',
    accessableby: 'Domi'
}