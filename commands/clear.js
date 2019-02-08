const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        let clearBad1 = new Discord.RichEmbed()
            .setTitle('BUZI!')
            .setDescription('Neked erre nincs engedélyed!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(clearBad1);
        return;
    }

    if(!args[0] || isNaN(args[0])) {
        let clearBad2 = new Discord.RichEmbed()
            .setTitle('Nyomorék!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setDescription('Nem tudok kitörölni semmilyen üzenetet!')
            .setFooter(`Helyes kód: ${prefix}clear <törlendő üzenetek száma>`)
        message.channel.send(clearBad2);
        return;
    }

    await message.channel.bulkDelete(parseInt(args[0]) + 1);

    let clearOutput = new Discord.RichEmbed()
        .setTitle('Siker!')
        .setColor('#9b9b9b')
        .setThumbnail('https://i.imgur.com/9BJ8AWV.png')
        .setDescription(`Kitöröltem **${args[0]}db** üzenetet.`)
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
    usage: 'clear <amennyi üzenetet kiszeretnél törölni>',
    description: 'Kitörli a kívánt mennyiségű üzenetet.',
    accessableby: 'Mindenki'
}