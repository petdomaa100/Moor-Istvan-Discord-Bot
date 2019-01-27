const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const botconfig = require('../botconfig.json');
const TimeFormat = require('hh-mm-ss');

module.exports.run = async (bot, message, args, prefix) => {
    const youtube = new YouTube(process.env.YT_API_KEY);

    if(!args) {
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

    let LINK;

    if(args[0].startsWith('https://')) {
        let valid = await YTDL.validateURL(args[0]);

        if (valid == true) {
            queue.push(args[0]);
            LINK = args[0];
        } else {
            message.channel.send(`A picsába! Nem találtam semmilyen videót erre a linkre: **${args[0]}**`);
            return;
        }
    } else {
        let kereses = args.join(' ');
        await youtube.searchVideos(kereses, 1).then((video) => {
            if(video.length <= 0) {
                message.channel.send(`A picsába! Nem találtam semmilyen videót erre a kulcsszóra: **${kereses}**`);
                return;    
            } else {
                queue.push(video[0].url);
                LINK = video[0].url;
            }
        });
    }

    function play (voicechannel) {
        message.guild.dispatcher = voicechannel.playStream(YTDL(queue[0], { filter: 'audioonly' }));
        
        queue.shift();

        message.guild.dispatcher.on('end', function() {
            if (queue.length >= 1) {
                play(voicechannel)
            } else {
                voicechannel.disconnect();
            }
        });
    };

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then((voicechannel) => {
        play(voicechannel);
    });
    
    const song = await YTDL.getInfo(LINK);
        
    let playOutput = new Discord.RichEmbed()
        .setAuthor('Hozzáadtam a lejátszási listához!', '', song.video_url)
        .setDescription(`__Zene Neve:__ ${song.title.length > 43 ? song.title.substring(0, 43) + '...' : song.title} **${song.player_response.videoDetails.isLive == true ? '🔴 LIVE' : '[' + TimeFormat.fromS(parseInt(song.length_seconds, 'mm:ss')) + ']'}**  \n__Csatorna:__ ${song.author.name}`)
        .setFooter('Moór remek DJ, de még van mit tanulnia', song.thumbnail_url)
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
