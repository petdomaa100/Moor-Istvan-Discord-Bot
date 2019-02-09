const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const botconfig = require('../botconfig.json');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message, args, prefix) => {
    const youtube = new YouTube(process.env.YT_API_KEY);

    if(!args[0]) {
        var playBad1 = new Discord.RichEmbed()
            .setTitle('Elbasztad!')
            .setDescription('Moór nem tudja a semmit lejátszani!')
            .setFooter(`Helyes commad használat: ${prefix}play <keresési kulcsszavak>`)
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad1);
        return;
    }

    if(!message.member.voiceChannel) {
        var playBad3 = new Discord.RichEmbed()
            .setTitle('Retaldált vagy!')
            .setDescription('Moór nem tud hozzád join-olni!')
            .setFooter('Benne kell hogy legyél egy Voice Channel-ben!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad3);
        return;
    }

    let kereses = args.join(' ');

    results = await youtube.searchVideos(kereses, 10);

    if(results.length <= 0) {
        message.channel.send(`A picsába! Nem találtam semmilyen videót erre a kulcsszóra: **${kereses}**`);
        return;    
    }

    let ytLINK = args.join('+');
    let sorszam = 1;

    let searchOutput = new Discord.RichEmbed()
        .setAuthor('Ezt találtam:', 'https://i.imgur.com/tyWsHfs.png', `https://www.youtube.com/results?search_query=${ytLINK}`)
        .setDescription(`${results.map(videok => `**${sorszam++} -** ${videok.title.length > 70 ? videok.title.substring(0, 70) + '...' : videok.title}`).join('\n\n')} \n\n 10 másodperc alatt válassz egy zenét, (zene száma)`)
        .setTimestamp()
        .setColor('#89c0c7')
        .setFooter('Válassz egyet...')
    const searchOutputMSG = await message.channel.send(searchOutput);
    
    try {
        var response = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.content >= 1 && msg.content <= 10, {max: 1, time: 10000, errors: ['time']});
    } catch (error) {
        message.delete();
        searchOutputMSG.delete();
        message.channel.send('BUZI, lejárt az időd. Most ütött az órád!').then((msg) => msg.delete(5000));
        return;
    }

    if(response) {
        const song = await YTDL.getInfo(results[parseInt(response.first().content) - 1].url);

        const zeneObject = {
            title: song.title,
            url: results[parseInt(response.first().content) - 1].shortURL,
            duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
            lengthInSec: song.length_seconds,
            thumbnail: song.thumbnail_url,
            channel: song.author.name,
        }

        queue.push(zeneObject);
        response.first().delete();
        searchOutputMSG.delete();
    }

    function play(voicechannel) {
        message.guild.dispatcher = voicechannel.playStream(YTDL(queue[0].url, { filter: 'audioonly' }));
        
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

    const song = queue[queue.length - 1];
            
    let playOutput = new Discord.RichEmbed()
        .setAuthor('Hozzáadtam a lejátszási listához!', '', song.video_url)
        .setDescription(`__Zene Neve:__ ${song.title.length > 43 ? song.title.substring(0, 43) + '...' : song.title} **${song.duration}** \n__Csatorna:__ ${song.channel}`)
        .setFooter('Moór remek DJ, de még van mit tanulnia', song.thumbnail_url)
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(playOutput);
}

module.exports.help = {
    name: 'search',
    aliases: ['s'],
    usage: 'search <keresési kulcsszó>',
    description: 'Rákeres a kívánt zenékre.',
    accessableby: 'Mindenki'
}