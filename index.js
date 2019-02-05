const Discord = require('discord.js');
const fs = require('fs');
const botconfig = require('./botconfig.json');
const prefixJSON = require('./data/prefix.json');

const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

require('./util/eventHandler')(bot);

function loadCommands() {
    fs.readdir('./commands/', (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if(jsfile.length <= 0) {
            console.log('Nem találtam commandokat.');
            return;
        }
    
        jsfile.forEach((f, i) => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name, props)
            });
        });

        console.log(`${jsfile.length} commands loaded!`);
    });    
}

loadCommands();

global.nowPlaying = null;
global.queue = [];

bot.on("message", async (message) => {
    if(message.channel.type === 'dm') return;
    //if(message.author.id == '302769145072844800') return;

    let prefix = prefixJSON.prefix;

    if(!message.content.startsWith(prefix)) return;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);
    const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot, message, args, prefix);
});

bot.login(process.env.TOKEN);