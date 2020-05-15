const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, message) => {
    return message.channel.send('Bocs, ez éppen nem működik...');
    let preMessage = await message.channel.send('Igenis Gordon Kapitány! Már készítem is...');
    
    memeRequest = function() {
        request('https://api-to.get-a.life/meme', function(err, resp, html) {
            if(err || resp.statusCode != 200) {
                preMessage.edit('OOF, valami baj vana szerverrel...').then((msg) => msg.delete(3000));
                return;
            }

            let randomMemeOutput = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setImage(JSON.parse(html).url)
                .setFooter(outputMessageRandomiser('!memeSiker'), bot.user.displayAvatarURL)
            preMessage.edit(randomMemeOutput);
        });
    }

    memeRequest();
}

module.exports.help = {
    name: 'meme',
    noalias: 'Nincs rokona',
    aliases: [],
    usage: 'meme',
    description: 'Küld egy fincsi meme-et.',
    accessableby: 'Mindenki'
}