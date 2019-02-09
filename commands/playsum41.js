const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message) => {
    if(!message.member.voiceChannel) {
        var playmixek1Bad3 = new Discord.RichEmbed()
            .setTitle('Retaldált vagy!')
            .setDescription('Moór nem tud hozzád join-olni!')
            .setFooter('Benne kell hogy legyél egy Voice Channel-ben!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playmixek1Bad3);
        return;
    }

    var zenek = ['https://youtu.be/Wvm3CwAQI44', 'https://youtu.be/D9cHP4KrdWI', 'https://youtu.be/t0Zbvtxb85I', 'https://youtu.be/Kjwlzs1OJcY', 'https://youtu.be/gjKQKnCUYkE', 'https://youtu.be/fpeudpjyWS8', 'https://youtu.be/uKNmG9A5Tc4', 'https://youtu.be/n6kk9Kc-FQo', 'https://youtu.be/OtWzoxAYZzo', 'https://youtu.be/m5INsndIw40', 'https://youtu.be/bYnffcY4tqs', 'https://youtu.be/3rIr6ino-cI'];

    function Shuffle(array) {
        for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    };

    zenek = Shuffle(zenek);

    for (let i = 0; i < zenek.length; i++) {
        const element = zenek[i];

        const song = await YTDL.getInfo(element);

        const zeneObject = {
            title: song.title,
            url: element,
            duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
            thumbnail: song.thumbnail_url,
            channel: song.author.name,
        }
    
        queue.push(zeneObject);
    }

    let playmixek1Output = new Discord.RichEmbed()
        .setTitle('Zenék hozzáadva!')
        .setDescription(`Playlist hossza: **${queue.length}**`)
        .setColor('RANDOM')
    message.channel.send(playmixek1Output);

    function play(voicechannel) {
        message.guild.dispatcher = voicechannel.playStream(YTDL(queue[0].url, { filter: 'audioonly', quality: 'highestaudio' }));
        
        nowPlaying = queue[0];
        queue.shift();

        message.guild.dispatcher.on('end', function() {
            if (queue.length >= 1) {
                play(voicechannel)
            } else {
                voicechannel.disconnect();
                nowPlaying = null;
            }
        });
    };

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => {
        play(voicechannel);
    });
}

module.exports.help = {
    name: 'playsum41',
    aliases: ['sum41'],
    usage: 'playsum41',
    description: 'Hozzáadja a zenéket, a playlist-hez.',
    accessableby: 'Mindenki'
}