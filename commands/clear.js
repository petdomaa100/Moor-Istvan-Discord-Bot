const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        let clearBad1 = new Discord.RichEmbed()
            .setTitle(outputMessage(anyazasEleje))
            .setDescription(outputMessage(noPermission))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearBad1);
        return;
    }
    
    if(args[0] && isNaN(args[0])) {
        let clearBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setDescription(outputMessageRandomiser('!clear_args-isNaN'))
            .setFooter(`Helyes command: ${prefix}clear <törlendő üzenetek száma>`)
        message.channel.send(clearBad2);
        return;
    }

    const szam = !args[0] ? 1 : Math.round(parseInt(args[0]));

    if(!szam || szam < 1 || szam > 99) {
        let clearBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setDescription('Moór nemt tud kitörölni ennyi üzenetet!')
            .setFooter('Minimum: 1db \xa0\xa0\xa0\xa0\xa0\xa0\xa0 Maximum: 99db')
        message.channel.send(clearBad2);
        return;
    }

    var error = false;

    await message.channel.bulkDelete(szam + 1).catch(e => {
        if(e.message.includes('You can only bulk delete messages that are under 14 days old.')) {
            let clearBad3 = new Discord.RichEmbed()
                .setTitle('OUFF!')
                .setColor('0xFF0000')
                .setThumbnail('https://i.imgur.com/Lgekz3D.png')
                .setDescription('Nem tudok kitörölni __14 napnál régebbi__ üzenetet!')
                .setFooter('Sajnos ez van... khm khm Discord')
            message.channel.send(clearBad3).then((msg) => msg.delete(2500));
            message.delete(2500);

            error = true;
        }
    });

    if(error == true) return;

    let clearOutput = new Discord.RichEmbed()
        .setTitle(outputMessageRandomiser('sikerEleje'))
        .setColor('#9b9b9b')
        .setThumbnail('https://i.imgur.com/9BJ8AWV.png')
        .setDescription(`Kitöröltem **${args[0] || '1'}db** üzenetet.`)
        .setFooter('Ez az üzenet 5 másodpercen bellül megsemmisül.')
    message.channel.send(clearOutput).then((msg) => {
        message.channel.fetchMessages({ limit: 1 }).then(async(messages) => {
            let msg2 = messages.array()[0];

            await Sleep(5000);

            if(msg.id == msg2.id) msg.delete();
        });
    });
}

module.exports.help = {
    name: 'clear',
    aliases: ['kuka', 'delete', 'del'],
    usage: 'clear <törlendő üzenetek száma>',
    description: 'Moór kitörli a megadott mennyiségű üzenetet.',
    accessableby: 'Mindenki'
}