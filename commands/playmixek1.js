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

    var zenek = ['https://youtu.be/HCcj226upCg', 'https://youtu.be/GTM-e3MjB08', 'https://youtu.be/htx3vmLkLEs', 'https://youtu.be/7y5KbHnDP8s', 'https://youtu.be/KBRtvcP9-M8'];

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
    name: 'playmixek1',
    aliases: ['totottcigi'],
    usage: 'playmixek1',
    description: 'Hozzáadja a mixet, a playlist-hez.',
    accessableby: 'Mindenki'
}