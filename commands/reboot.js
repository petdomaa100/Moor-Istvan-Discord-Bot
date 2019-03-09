const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const fs = require('fs');

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) {
        let rebootBad1 = new Discord.RichEmbed()
            .setTitle('Autista!')
            .setDescription('Neked erre nincs engedélyed!')
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(rebootBad1);
        return;
    }

    function Reboot() {
        try {
        } catch (err) {
            message.channel.send(`Valami elbaszódott a commandok újratöltsése közben.`);
            return;
        }    
    }

    if(bot.voiceConnection) {
        message.guild.voiceConnection.disconnect();
    }

    var loadMessage = await message.channel.send('*Commandok előkészítése...*');

    await fs.readdir('../code/commands', async(err, files) => {
        if(err) console.log(err);

        var index = 0;
        var jsfile = files.filter(f => f.split('.').pop() === 'js');
        
        jsfile.forEach(async (f) => {
            delete require.cache[require.resolve(`./${f}`)];

            bot.commands.delete(f);

            const props = require(`./${f}`);
            
            await bot.commands.set(props.help.name, props);
            index++;
    
            const eltelt = 'l'.repeat(index);
            const maradek = '.'.repeat(jsfile.length - eltelt.length);
            
            szazalek = eltelt + maradek;

            loadMessage.edit(`__Reloading:__ \`${f}\` \n[${szazalek}] (${index}/${jsfile.length})`);
        });
    });
}   

module.exports.help = {
    name: 'reboot',
    aliases: ['restart', 'reload'],
    usage: 'reboot',
    description: 'Újraindítja Moór-t.',
    accessableby: 'Adminok'
}
