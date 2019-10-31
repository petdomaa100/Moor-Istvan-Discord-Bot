const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        var shuffleBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('UserNotInVC'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(shuffleBad1);
        return;
    }

    if(queue.lenght <= 0) {
        var shuffleBad2 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noMusicPlaying'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
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
        .setTitle(outputMessageRandomiser('sikerEleje'))
        .setDescription(outputMessageRandomiser('!qsSiker'))
        .setFooter(outputMessageRandomiser('sikerVege'))
        .setColor('RANDOM')
    message.channel.send(shuffleOuput);
}

module.exports.help = {
  name: 'shufflequeue',
  aliases: ['sq'],
  usage: 'shufflequeue',
  description: 'Moór megkeveri a lejátszási listát.',
  accessableby: 'Mindenki'
}