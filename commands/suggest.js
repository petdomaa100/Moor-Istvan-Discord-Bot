const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(args[0]) {
        let suggestBad1 = new Discord.RichEmbed()
            .setTitle('BUZI')
            .setDescription(`Csak simán írd be, hogy **${prefix}suggest**`)
            .setFooter('Nyomorék...')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(suggestBad1);
        return;
    }

    let sugOptions = new Discord.RichEmbed()
        .setTitle('Remek!')
        .setDescription('Írd le a kérelmedet, de ne légyék köcsög, mert annak is 50-es lista lesz a vége!')
        .setFooter('2 perced van! A  CANCEL  beírásával eldobhatod a kérelmedet.')
        .setColor('RANDOM')
        .setTimestamp()
    var sugOptionsMSG = await message.channel.send(sugOptions);

    try {
        var opcio = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, { max: 1, time: 120000, errors: ['time'] });
    } catch (error) {
        message.delete();
        sugOptionsMSG.delete();
        message.reply('TE BUZI, lejárt az időd! Letelt a 2 perc. Próbéld újra.').then((msg) => msg.delete(4000));
        return;
    }

    const kerelem = opcio.first().content;

    sugOptionsMSG.delete();
    message.delete();
    opcio.first().delete();

    if(kerelem == 'CANCEL') {
        let suggestCancel = new Discord.RichEmbed()
            .setTitle('OK boss.')
            .setDescription('Kérelem eldobva!')
            .setColor('RANDOM')
        message.channel.send(suggestCancel).then((msg) => msg.delete(5000));
        return;
    }

    let PERSON = message.guild.members.find(member => member.id == '346946719440830466');

    let suggestionOutput1 = new Discord.RichEmbed()
        .setTitle('Kérelem!')
        .setDescription(`__Csicska:__ ${message.member} \n\n__Kérelem:__\n ${kerelem}`)
        .setTimestamp()
        .setColor('RANDOM')
    await PERSON.send(suggestionOutput1);
    
    let suggestionOutput2 = new Discord.RichEmbed()
        .setTitle('Kész!')
        .setDescription(`${message.author.username}, elmentettem a kérésedet te csicska.`)
        .setFooter('Legyél türelmes, vagy 50 lista lesz ennek is a vége.')
        .setTimestamp()
        .setColor('0x008000')
    message.channel.send(suggestionOutput2);
}

module.exports.help = {
    name: 'suggest',
    aliases: ['kérelem'],
    usage: 'suggest',
    description: 'Elküldi a kérelmedet, amit idővel be is fog egy Bot Admin rakni.  (no homo)',
    accessableby: 'Mindenki'
}