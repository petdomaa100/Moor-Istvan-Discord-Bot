const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) {
        let rebootBad1 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setDescription('Neked erre nincs engedélyed!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(rebootBad1);
        return;
    }

    if(args[0]) {
        let rebootBad2 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
            .setDescription(`Csak simán írd be, hogy ${prefix}reboot`)
            .setFooter(`Helyes kód: ${prefix}reboot <törlendő üzenetek száma>`)
        message.channel.send(rebootBad2);
        return;
    }

    let CHANNEL = message.guild.channels.find(channel => channel.id == '526037223196590080');

    if(bot.voiceConnection) {
        message.guild.voiceConnection.disconnect();
    }

    message.channel.send('**Újraindítom magam...**').then((msg) => {
        bot.destroy().then(() => bot.login(process.env.TOKEN)).then(() => {
            msg.channel.send('Újraindultam.');

            let rebootOutput = new Discord.RichEmbed()
                .setTitle('Moór újraindult!')
                .setDescription(`${msg.author.username} újraindította Moór-t.`)
                .setColor('#FF9900')
                .setTimestamp()
            CHANNEL.send(rebootOutput);
        });
    });
}   

module.exports.help = {
    name: 'reboot',
    aliases: ['restart'],
    usage: 'reboot',
    description: 'Újraindítja Moór-t.',
    accessableby: 'Adminok'
}
