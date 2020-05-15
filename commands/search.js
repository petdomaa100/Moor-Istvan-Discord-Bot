const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const botconfig = require('../botconfig.json');
const TimeFormat = require('hh-mm-ss');
const fetchVideoInfo = require('youtube-info');

module.exports.run = async (bot, message, args) => {
    const youtube = new YouTube(process.env.YT_API_KEY);

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
        const song = await fetchVideoInfo(results[parseInt(response.first().content) - 1].id);

        const zeneObject = {
            title: song.title,
            channel: song.owner,
            id: song.videoId,
            url: `https://youtu.be/${results[parseInt(response.first().content) - 1].id}`,
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
        response.first().delete();
        searchOutputMSG.delete();
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
    };

    const Song = queue[queue.length - 1];

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => play(voicechannel));
        
    let searchOutputFinal = new Discord.RichEmbed()
        .setAuthor('Moór hozzáadta a lejátszási listához!', '', Song.url)
        .setDescription(`__Zene Neve:__ ${Song.title.length > 43 ? Song.title.substring(0, 43) + '...' : Song.title } **${Song.duration}** \n__Csatorna:__ ${Song.channel} \n__Közzétett:__ \`${Song.published}\` **|-|** __Category:__ \`${Song.genre}\` \n 👁 ${Separate(Song.viewCount, ' ')} **|-|** 👍 ${Song.likes} **|-|** 👎 ${Song.dislikes} **|-|** 🗨 ${Song.comments}`)
        .setFooter(outputMessageRandomiser('sikerVege'), Song.thumbnail)
        .setColor('#f15a35')
        .setThumbnail('https://i.imgur.com/8LaIJTB.png')
        .setTimestamp()
    message.channel.send(searchOutputFinal);
}

module.exports.help = {
    name: 'search',
    aliases: ['s'],
    usage: 'search <keresési kulcsszó>',
    description: 'Rákeres a kívánt zenékre.',
    accessableby: 'Mindenki'
}