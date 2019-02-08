const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(args[0] == 'help') return message.channel.send(`Írd be, hogy **${prefix}help**.`);

    const userRoles = message.member.roles.map(roles => roles.name);
    let serverCommandok = [];

    if(userRoles.includes('Diktátor Titkára (majdnem főadmin)')) {
        serverCommandok = ['play', 'search', 'pause', 'resume', 'disconnect', 'queue', 'clearqueue', 'removequeue', 'queueshuffle', 'nowplaying', 'botinfo', 'serverinfo', 'userinfo', 'prefix', 'reboot', 'seasonal_skin', 'clear', 'say', 'ping', 'dog', 'meme', 'mazo', 'help', 'report', 'react', 'join', 'leave', 'playmixek1', 'playsum41'];
    }

    else if(userRoles.includes('Létező Emberek')) {
        serverCommandok = ['play', 'search', 'pause', 'resume', 'disconnect', 'queue', 'clearqueue', 'removequeue', 'queueshuffle', 'nowplaying', 'botinfo', 'serverinfo', 'userinfo', 'seasonal_skin', 'say', 'dog', 'meme', 'mazo', 'help', 'report', 'react', 'join', 'leave', 'playmixek1', 'playsum41'];
    }
    
    else {
        serverCommandok = ['play', 'search', 'pause', 'resume', 'disconnect', 'queue', 'clearqueue', 'removequeue', 'queueshuffle', 'nowplaying', 'botinfo', 'serverinfo', 'userinfo', 'say', 'dog', 'meme', 'mazo', 'help', 'report', 'react', 'join', 'leave', 'playmixek1', 'playsum41'];
    }
    
    if(args[0]) {
        let command = args[0].toLowerCase();
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);

            if(serverCommandok.includes(args[0])) {
                let helpSpesificOutput = new Discord.RichEmbed()
                    .setColor('#ff9900')
                    .setAuthor('Moór Help')
                    .setDescription(`Moór prefix-e: **${prefix}** \n\n **Command:** ${command.help.name}\n **Leírás:** ${command.help.description || "Nincs leírás"}\n **Használat:** ${prefix}${command.help.usage || "Nincs használat"}\n **Használhatja:** ${command.help.accessableby  || "Mindenki"}\n **Rokonai:** ${command.help.noalias || '`' + command.help.aliases.join('`, `') + '`'}`)
                message.channel.send(helpSpesificOutput);
            } else {
                let helpSpesificBad = new Discord.RichEmbed()
                    .setTitle('Autista!')
                    .setDescription('Neked erre nincs is engedélyed!')
                    .setColor('0xFF0000')
                    .setThumbnail('https://i.imgur.com/Lgekz3D.png')    
                    .setFooter('lol')
                    .setTimestamp()
                message.channel.send(helpSpesificBad);
                return;
            }
        } else {
            let helpBad1 = new Discord.RichEmbed()
                .setTitle('Elkúrtad!')
                .setDescription(`Nincs ilyen commandja Moórnak: **${command}**`)
                .setColor('0xFF0000')
                .setThumbnail('https://i.imgur.com/Lgekz3D.png')    
            message.channel.send(helpBad1);
            return;
        }
    }

    if(!args[0]) {            
        let helpOutputNormal = new Discord.RichEmbed()
            .setAuthor('Moór Help')
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setColor('#ff9900')
            .setDescription(`Moór Istvánnak sok command-ja van. Szereti Zokniszabályt és a tejet. Meg a teknősöket. Szeret feleltetni, és kedvenc étele az aranyérkenőcs. \n\n Az ő prefix-e: **${prefix}**`)
            .addField('Commadok:', '`' + serverCommandok.join('` `') + '`')
            .setFooter('Moór istván', bot.user.displayAvatarURL)
         message.channel.send(helpOutputNormal);
    }
}

module.exports.help = {
    name: 'help',
    aliases: ['commands', 'halp', 'h'],
    usage: 'help <egy command>',
    description: 'Segítség a bot commandjai-hoz.',
    accessableby: 'Mindenki'
}