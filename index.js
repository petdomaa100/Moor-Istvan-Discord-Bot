const Discord = require('discord.js');
const fs = require('fs');
const botconfig = require('./botconfig.json');

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
    
        jsfile.forEach((f) => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props);

            if(props.help.aliases) {
                props.help.aliases.forEach(alias => {
                    bot.aliases.set(alias, props.help.name, props);
                });
            }
        });

        console.log(`${jsfile.length} commands loaded!`);
    });    
}

loadCommands();

global.nowPlaying = null;
global.queue = [];
global.blacklist = [];
global.bannedGames = ['Minecraft'];

const undoritoKepek = ['https://i.ytimg.com/vi/YubEjXt1Bf4/maxresdefault.jpg', 'https://i.ytimg.com/vi/p3gZi62iefo/maxresdefault.jpg', 'https://i.pinimg.com/originals/23/6a/42/236a42486c6b097c6fc92e0476984180.jpg', 'https://i.ytimg.com/vi/tOJlVPW3PGw/maxresdefault.jpg', 'https://i.ytimg.com/vi/jxZSILBrowA/maxresdefault.jpg', 'https://i.ytimg.com/vi/IvX2_7IM9gs/maxresdefault.jpg'];

const outputMessagesJSON = require('./data/outputMessages.json');

global.Sleep = function(millisec) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > millisec) {
            break;
        }
    }
}

global.Separate = function(number, sepSign) {
    number = number.toString().split('').reverse().join('');

    szamReturn = [];

    for (let i = 0; i < number.length; i++) {
        const szam = number[i].toString();

        if((i + 1) % 3 === 0 && i != number.length - 1) {
            szamReturn.push(sepSign + szam);
        } else {
            szamReturn.push(szam);
        }
    }

    return szamReturn.reverse().join('').toString();
}

global.SzazalekBar = function(barLength, osszes, ebbolMegvan) {
    var barLength = parseInt(barLength); //100
    var osszes = parseInt(osszes); //30
    var ebbolMegvan = parseInt(ebbolMegvan); //25
    var egyBar = osszes / barLength; //0.3

    const megvan = parseInt( Math.floor(ebbolMegvan / egyBar) ); //10
    const hianyzik = parseInt(barLength - megvan); //90

    if(hianyzik < 0) throw 'Overflow';
    
    return `${megvan}__${hianyzik}`;
}

global.Death = function(aldozat, i) {
    const USER = bot.users.find(x => x.discriminator == aldozat.user.split('#')[1]);
    const NUMBER = Math.floor(Math.random() * undoritoKepek.length);

    if(!USER.username || !NUMBER) return;

    let fortniteFOS = new Discord.RichEmbed()
        .setTitle('Ezt neked te kis buzi!')
        .setImage(undoritoKepek[NUMBER])
        .setColor('RANDOM')
        .setFooter('Majd legközelebb megtanulod!')
    USER.send(fortniteFOS).catch(() => {
        const server = bot.guilds.get('441609826800369674');

        if(server) {
            server.member(USER).kick(USER.reason);
            
            blacklist.splice(i, 1);
        }
    });
}

global.outputMessageRandomiser = function(msg) {
    return outputMessagesJSON[msg][ Math.floor(Math.random() * outputMessagesJSON[msg].length) ];
}

bot.on("message", async (message) => {
    if(message.channel.type === 'dm') return;
    if(bot.user.presence.status == 'dnd') return;  

    const prefixJSON = require('./data/prefix.json');
    var prefix;

    if (!prefixJSON.prefix) {
        prefix = botconfig.prefix;
    } else {
        prefix = prefixJSON.prefix;
    }

    if(!message.content.startsWith(prefix)) return;

    for (let i = 0; i < blacklist.length; i++) {
        if(blacklist[i].user == `${message.author.username}#${message.author.discriminator}` && blacklist[i].lvl >= 2) {
            message.delete();
            message.reply('Buzi! Neked erre nincs engedélyed!   lol').then((msg) => msg.delete(3000));
            return;
        }
    }

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);
    const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot, message, args, prefix, prefixJSON, outputMessagesJSON);
});

bot.login(process.env.TOKEN);
