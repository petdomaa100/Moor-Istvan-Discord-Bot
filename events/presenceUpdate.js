const Discord = require('discord.js');

data = [];

module.exports = async (oldMember, newMember) => {
    if(newMember.user.presence.game && bannedGames.includes(newMember.user.presence.game.name)) {
        Obj = {
            fullUsername: `${newMember.user.username}#${newMember.user.discriminator}`,
            username: newMember.user.username,
            discriminator: newMember.user.discriminator,
            game: newMember.user.presence.game.name,
            start: new Date().getTime()
        }
    
        data.push(Obj);
    }

    else if(!newMember.user.presence.game) {
        let username = `${newMember.user.username}#${newMember.user.discriminator}`;

        for (let x = 0; x < data.length; x++) {
            User = data[x];
            
            if(User.fullUsername == username) {
                Difference = (new Date().getTime() - User.start) / 1000;
                data.splice(x, 1)

                Data = {
                    fullUsername: User.fullUsername,
                    username: User.username,
                    discriminator: User.discriminator,      
                    game: User.game,
                    duration: Math.round(Difference)
                }

                let channel = newMember.guild.channels.find(channel => channel.name.includes(Data.username));

                if(channel == undefined || channel == null || channel == '') {
                    let CHANNEL = await newMember.guild.createChannel(`${Data.username}: ${(Data.duration / 60).toFixed(1)} perc`, { type: 'voice' });
    
                    CHANNEL.setParent('649289949983670273');
                } else {
                    let num = channel.name.split(': ')[1];
                    
                    num = Number(num.substring(0, num.length - 5));

                    channel.setName(`${Data.username}: ${(Data.duration / 60 + num).toFixed(1)} perc`);
                }
            }
        }
    }
}