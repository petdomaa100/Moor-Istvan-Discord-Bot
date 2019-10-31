const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const botconfig = require('../botconfig.json');
const TimeFormat = require('hh-mm-ss');
const fetchVideoInfo = require('youtube-info');

module.exports.run = async (bot, message, args) => {
    const youtube = new YouTube(botconfig.yt_api_key);

    if(!args[0]) {
        var playBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('!play-noArgs'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad1);
        return;
    }

    if(!message.member.voiceChannel) {
        var playBad3 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasVege'))
            .setDescription(outputMessageRandomiser('UserNotInVC'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(playBad3);
        return;
    }

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
    }

    if(args[0].startsWith('https://www.youtube.com/playlist?')) {
        let error = false;

        const playlist = await youtube.getPlaylist(args[0]).catch((err) => {
            if(err.message.includes('youtube#playlistListResponse not found')) {
                message.channel.send('Ups, ez a playlist Privát, Moór nem tudja meghallgatni.');
            }

            error = true;
        });

        if(error == true) return;
        
        const playlistVideos = await playlist.getVideos();
        
        playlistPreMSG = await message.channel.send(`Moór már dolgozik is rajta. \`(0/${playlistVideos.length})\``)

        for (let i = 0; i < playlistVideos.length; i++) {
            const video = playlistVideos[i];
            const valid = YTDL.validateURL(video.url);

            if (valid == true) {
                const song = await fetchVideoInfo(video.id);

                const zeneObject = {
                    title: song.title,
                    channel: song.owner,
                    id: song.videoId,
                    url: `https://youtu.be/${video.id}`,
                    duration: song.duration == 0 ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.duration, 'mm:ss')) + ']',
                    lengthInSec: song.duration,
                    published: song.datePublished.split('-').join('/'),
                    genre: song.genre,
                    viewCount: Number(song.views),
                    likes: song.likeCount,
                    dislikes: song.dislikeCount,
                    comments: song.commentCount,
                    thumbnail: song.thumbnailUrl
                }
                                
                queue.push(zeneObject);

                playlistPreMSG.edit(`Moór már dolgozik is rajta. \`(${i + 1}/${playlistVideos.length})\``)
            }
        }
        
        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => play(voicechannel));

        let playlistOutput = new Discord.RichEmbed()
            .setAuthor('Moór hozzáadta a lejátszási listához!', '', args[0])
            .setDescription(`__Playlist Neve:__ ${playlist.title.length > 43 ? playlist.title.substring(0, 43) + '...' : playlist.title} \n__Zenék száma:__ **${playlistVideos.length}**`)
            .setFooter(outputMessageRandomiser('sikerVege'))
            .setColor('#f15a35')
            .setThumbnail('https://i.imgur.com/8LaIJTB.png')
            .setTimestamp()
        playlistPreMSG.edit(playlistOutput);
        return;
    }
    
    if(args[0].startsWith('https://www.youtube.com/')) {
        let error = false;

        const valid = await YTDL.validateURL(args[0]);
        
        if (valid == true) {
            const song = await fetchVideoInfo(args[0].split('v=')[1]).catch(() => {
                message.channel.send('OOF \nValami kurva nagy baj van, és ez most nem működik.');
                
                error = true;    
            });

            if(error == true) return;

            const zeneObject = {
                title: song.title,
                channel: song.owner,
                id: song.videoId,
                url: `https://youtu.be/${song.id}`,
                duration: song.duration == 0 ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.duration, 'mm:ss')) + ']',
                lengthInSec: song.duration,
                published: song.datePublished.split('-').join('/'),
                genre: song.genre,
                viewCount: Number(song.views),
                likes: song.likeCount,
                dislikes: song.dislikeCount,
                comments: song.commentCount,
                thumbnail: song.thumbnailUrl
            }

            queue.push(zeneObject);
        } else {
            return message.channel.send(`A picsába! Nem találtam semmilyen videót erre a linkre: **${args[0]}**`);
        }
    }
    
    else {
        const kereses = args.join(' ');
        const video = await youtube.searchVideos(kereses, 1);
            
        if(video.length <= 0) {
            return message.channel.send(`A picsába! Nem találtam semmilyen videót erre a kulcsszóra: **${kereses}**`);    
        } else {
            const song = await fetchVideoInfo(video[0].id);

            const zeneObject = {
                title: song.title,
                channel: song.owner,
                id: song.videoId,
                url: `https://youtu.be/${video[0].id}`,
                duration: song.duration == 0 ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.duration, 'mm:ss')) + ']',
                lengthInSec: song.duration,
                published: song.datePublished.split('-').join('/'),
                genre: song.genre,
                viewCount: Number(song.views),
                likes: song.likeCount,
                dislikes: song.dislikeCount,
                comments: song.commentCount,
                thumbnail: song.thumbnailUrl
            }

            queue.push(zeneObject);
        }
    }

    const Song = queue[queue.length - 1];

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => play(voicechannel));
        
    let playOutput = new Discord.RichEmbed()
        .setAuthor('Moór hozzáadta a lejátszási listához!', '', Song.url)
        .setDescription(`__Zene Neve:__ ${Song.title.length > 43 ? Song.title.substring(0, 43) + '...' : Song.title } **${Song.duration}** \n__Csatorna:__ ${Song.channel} \n__Közzétett:__ \`${Song.published}\` **|-|** __Category:__ \`${Song.genre}\` \n 👁 ${Separate(Song.viewCount, ' ')} **|-|** 👍 ${Song.likes} **|-|** 👎 ${Song.dislikes} **|-|** 🗨 ${Song.comments}`)
        .setFooter(outputMessageRandomiser('sikerVege'), Song.thumbnail)
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(playOutput);

}

module.exports.help = {
    name: 'play',
    aliases: ['p', 'csapassad'],
    usage: 'play <yt_link/keresési kulcsszó/yt_playlist>',
    description: 'Moór lejátsza a kívánt zenét, abba a Voice Channel-be amiben vagy.',
    accessableby: 'Mindenki'
}