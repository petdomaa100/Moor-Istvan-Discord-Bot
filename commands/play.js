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
    }

    if(args[0].startsWith('https://www.youtube.com/playlist?list=')) {

        const playlist = await youtube.getPlaylist(args[0]);

        const playlistVideos = await playlist.getVideos();

        for (let i = 0; i < playlistVideos.length; i++) {
            const video = playlistVideos[i];
            const valid = YTDL.validateURL(video.url);

            if (valid == true) {
                const song = await YTDL.getInfo(video.url);

                const zeneObject = {
                    title: song.title,
                    url: video.shortURL,
                    duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
                    lengthInSec: song.length_seconds,
                    thumbnail: song.thumbnail_url,
                    channel: song.author.name,
                }
            
                queue.push(zeneObject);
            }
        }

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => {
            play(voicechannel);
        });

        let playlistOutput = new Discord.RichEmbed()
            .setAuthor('Hozzáadtam a lejátszási listához!', '', args[0])
            .setDescription(`__Playlist Neve:__ ${playlist.title.length > 43 ? playlist.title.substring(0, 43) + '...' : playlist.title} \n__Zenék száma:__ **${playlistVideos.length}**`)
            .setFooter('Remek zenész vagyok')
            .setColor('#f15a35')
            .setThumbnail('https://i.imgur.com/8LaIJTB.png')
            .setTimestamp()
        message.channel.send(playlistOutput);
        return;
    }
    
    if(args[0].startsWith('https://www.youtube.com/')) {
        const valid = await YTDL.validateURL(args[0]);

        if (valid == true) {
            const song = await YTDL.getInfo(args[0]);

            const zeneObject = {
                title: song.title,
                url: `https://youtu.be/${song.video_id}`,
                duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
                lengthInSec: song.length_seconds,
                thumbnail: song.thumbnail_url,
                channel: song.author.name,
            }
    
            queue.push(zeneObject);
        } else {
            return message.channel.send(`A picsába! Nem találtam semmilyen videót erre a linkre: **${args[0]}**`);
        }
    }
    
    else {
        const video = await youtube.searchVideos(args.join(' '), 1);
            
        if(video.length <= 0) {
            return message.channel.send(`A picsába! Nem találtam semmilyen videót erre a kulcsszóra: **${kereses}**`);    
        } else {
            const song = await YTDL.getInfo(video[0].url);

            const zeneObject = {
                title: song.title,
                url: video[0].shortURL,
                duration: song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']',
                lengthInSec: song.length_seconds,
                thumbnail: song.thumbnail_url,
                channel: song.author.name,
            }
    
            queue.push(zeneObject);
        }
    }

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => {
        play(voicechannel);
    });
    
    const song = queue[queue.length - 1];
        
    let playOutput = new Discord.RichEmbed()
        .setAuthor('Hozzáadtam a lejátszási listához!', '', song.url)
        .setDescription(`__Zene Neve:__ ${song.title.length > 43 ? song.title.substring(0, 43) + '...' : song.title} **${song.duration}** \n__Csatorna:__ ${song.channel}`)
        .setFooter('Moór remek DJ, de még van mit tanulnia', song.thumbnail)
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(playOutput);
}

module.exports.help = {
    name: 'play',
    aliases: ['p', 'csapassad'],
    usage: 'play <yt_link/keresési kulcsszó>',
    description: 'Lejátsza a kívánt nezét abba a Voice Channel-be amiben vagy.',
    accessableby: 'Mindenki'
}