const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, message) => {
    let preMessage = await message.channel.send('Igenis Gordon Kapitány! már készítem is...');
    
    memeRequest = function() {
        request('https://api-to.get-a.life/meme', function(err, resp, html) {
            if(err || resp.statusCode != 200) {
                preMessage.edit('ouff, valami baj vana szerverrrel...').then((msg) => msg.delete(3000));
                return;
            }

            let randomMemeOutput = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setImage(JSON.parse(html).url)
                .setFooter('Moór István szereti a meme-eket.', bot.user.displayAvatarURL)
            preMessage.edit(randomMemeOutput);
        });
    }

    memeRequest();
}

module.exports.help = {
    name: 'meme',
    aliases: ['randommeme', 'random_meme'],
    usage: 'meme',
    description: 'Küld egy fincsi meme-et.',
    accessableby: 'Mindenki'
}
