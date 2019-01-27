const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if(args[0] == 'help') return message.channel.send(`Írd be, hogy **${prefix}help**.`);
    
    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var helpOutputSpesific = new Discord.RichEmbed()
                .setColor('#ff9900')
                .setAuthor('Moór Help')
                .setDescription(`Moór prefix-e: **${prefix}** \n\n **Command:** ${command.help.name}\n **Leírás:** ${command.help.description || "Nincs leírás"}\n **Használat:** ${prefix}${command.help.usage || "Nincs használat"}\n **Használhatja:** ${command.help.accessableby  || "Mindenki"}\n **Rokonai:** ${command.help.noalias || command.help.aliases}`)
            message.channel.send(helpOutputSpesific);
        }
    };

    if(!args[0]) {            
        let helpOutputNormal = new Discord.RichEmbed()
            .setAuthor('Moór Help')
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setColor('#ff9900')
            .setDescription(`Moór Istvánnak sok command-ja van. Szereti Zokniszabályt és a tejet. Meg a teknősöket. Szeret feleltetni, és kedvenc étele az aranyérkenőcs. \n\n Az ő prefix-e: **${prefix}**`)
            .addField('Commadok:', ' `play` `pause` `resume` `restart` `botinfo` `serverinfo` `userinfo` `prefix` `seasonal_skin` `clear` `say` `ping` `dog` `random_meme` `random_img` `help` `report` `react` `gyere` `leave`')
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