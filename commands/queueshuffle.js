const Discord = require('discord.js');

module.exports.run = async (bot, message, prefix) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        var shuffleBad1 = new Discord.RichEmbed()
            .setTitle('Retardált!')
            .setDescription('Ezt így nem tudom megcsinálni!')
            .setFooter('Ugyan abban a Voice Channel-ben kell lenned mint Moór.')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(shuffleBad1);
        return;
    }

    if(queue.lenght <= 0) {
        var shuffleBad2 = new Discord.RichEmbed()
            .setTitle('Retardált!')
            .setDescription('Nem is megy semmilyen zene!')
            .setFooter(`Berakhatsz egy csodás zenét a ${prefix}play <youtube link> commandal!`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(shuffleBad2);
    }

    function Shuffle(array) {
        for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    };

    queue = Shuffle(queue);

    let shuffleOuput = new Discord.RichEmbed()
        .setTitle('Megkeverve!')
        .setDescription(`Újrakevertem a lejátszási listát! \nEzt megnázheted a ${prefix}queue command-al.`)
        .setFooter('Olyan skill-eim vannak, beszarsz')
        .setColor('RANDOM')
    message.channel.send(shuffleOuput);
}

module.exports.help = {
  name: 'shufflequeue',
  aliases: ['sq'],
  usage: 'shufflequeue',
  description: 'Megkeveri a lejátszási listát.',
  accessableby: 'Mindenki'
}