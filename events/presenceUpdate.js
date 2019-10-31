const Discord = require('discord.js');

module.exports = (oldMember, newMember) => {
    if(newMember.user.presence.game && newMember.user.presence.game.name === 'Google Chrome') {
        //Add start time to the db with user info.

        wotCounterStart = function(user) {
            const start = new Date().getTime();
            console.log('start');
        }

        wotCounter(newMember);
    }
    
    else if(!newMember.user.presence.game) {
        //Search for the user in the db, get the start time. Get the time difference (with start - end), add to db the elapsed time.
        
        wotCounterEnd = function(user) {
            const end = new Date().getTime();
    
            //console.log((start - end) * 1000);    
        }
    }
}