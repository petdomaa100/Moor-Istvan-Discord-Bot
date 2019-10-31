const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const fs = require('fs');

module.exports.run = async (bot, message, args, prefix) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) {
        let rebootBad1 = new Discord.RichEmbed()
            .setTitle(outputMessageRandomiser('anyazasEleje'))
            .setDescription(outputMessageRandomiser('noPermission'))
            .setFooter(outputMessageRandomiser('anyazasVege'))
            .setColor('0xFF0000')
            .setThumbnail('https://i.imgur.com/Lgekz3D.png')
        message.channel.send(rebootBad1);
        return;
    }

    if(bot.voiceConnection) {
        message.guild.voiceConnection.disconnect();
    }

    const CHANNEL = message.guild.channels.find(channel => channel.id == '526037223196590080');

    var loadMessage = await message.channel.send('*Commandok előkészítése...*');

    await fs.readdir(__dirname, async(err, files) => {
        if(err) console.log(err);

        var index = 0;
        var jsfile = await files.filter(f => f.split('.').pop() === 'js');
        
        try {
            await jsfile.forEach(async (f) => {
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
        } catch (err) {
            message.channel.send('Error történt! \n\n' + err.message);
            return;
        }
        
        await loadMessage.edit('**Commandok újratöltve!**');

        await Sleep(2000);

        await loadMessage.edit('**Újraindítom magam...**').then(() => {
            bot.destroy().then(() => bot.login(botconfig.token)).then(async() => {
                await loadMessage.edit('**Újraindultam.**');
        
                let rebootOutput = new Discord.RichEmbed()
                    .setTitle('Moór újraindult!')
                    .setDescription(`${message.author.username} újraindította Moór-t.`)
                    .setColor('#FF9900')
                    .setTimestamp()
                CHANNEL.send(rebootOutput);
    
                loadMessage.delete(4000);
            });
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