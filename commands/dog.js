const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, message) => {
    let preMessage = await message.channel.send('Már keresek is egy kutyát...');
    
    dogRequest = function() {
        request('https://random.dog/woof.json', function(err, resp, html) {
            if(err || resp.statusCode != 200) {
                preMessage.edit('lol, valami baj vana szerverrrel...').then((msg) => msg.delete(3000));
                return;
            }

            kutya = JSON.parse(html).url;

            const kutyaSplitted = kutya.split('.');
    
            if(kutyaSplitted[kutyaSplitted.length - 1] == 'mp4') {
                dogRequest();
            } else {
                let randomdogOutput = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setImage(kutya)
                    .setFooter('Moór István szereti a kutyákat.', bot.user.displayAvatarURL)
                preMessage.edit(randomdogOutput);    
            }
        });
    }

    dogRequest();
}

module.exports.help = {
    name: 'dog',
    aliases: ['kutya', 'doggo'],
    usage: 'dog',
    description: 'Küld egy random képet egy random kutyáról.',
    accessableby: 'Mindenki'
}
