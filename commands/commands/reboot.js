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

    console.log('This executes before the fs.readdir finishes.');
    
    //loadMessage.edit('**Commandok újratöltve!**');

    /*
    let CHANNEL = message.guild.channels.find(channel => channel.id == '526037223196590080');

    await Sleep(1000);

    message.channel.send('**Újraindítom magam...**').then((msg) => {
        bot.destroy().then(() => bot.login(botconfig.token)).then(() => {
            msg.channel.send('Újraindultam.');

            let rebootOutput = new Discord.RichEmbed()
                .setTitle('Moór újraindult!')
                .setDescription(`${message.author.username} újraindította Moór-t.`)
                .setColor('#FF9900')
                .setTimestamp()
            CHANNEL.send(rebootOutput);
        });
    });*/
}   

module.exports.help = {
    name: 'reboot',
    aliases: ['restart', 'reload'],
    usage: 'reboot',
    description: 'Újraindítja Moór-t.',
    accessableby: 'Adminok'
}