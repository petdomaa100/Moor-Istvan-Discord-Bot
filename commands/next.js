const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        var nextBad1 = new Discord.RichEmbed()
            .setTitle('Elbasztad!')
            .setDescription('Moór azt nem tudja megcsinálni!')
            .setFooter('Ugan abban a Voice Channel-ben kell lenned, mindt Moór.')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nextBad1);
        return;
    }
    
    if(message.guild.dispatcher) {
        message.guild.dispatcher.end();

        var next_good = new Discord.RichEmbed()
            .setTitle('Értettem!')
            .setDescription('Moór átugorja ezt a zenét!')
            .setFooter('Moór remek DJ, de azért még van mit tanulnia.')
            .setColor('0x008000')
            .setThumbnail('https://i.imgur.com/JCBGbiw.png')
        message.channel.send({embed: next_good});
    } else {
        var nextBad2 = new Discord.RichEmbed()
            .setTitle('Elkúrtad!')
            .setDescription('Nem is megy zene!')
            .setFooter(`Elindíthatsz zenét a ${prefix}play commandal.`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(nextBad2);
    }
}
module.exports.help = {
    name: 'next',
    aliases: ['skip', 'kövi'],
    usage: 'next',
    description: 'Átugorja az épp jétszó zenét.',
    accessableby: 'Mindenki'
}