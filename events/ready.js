const Discord = require('discord.js');
const prefixJSON = require('../data/prefix.json');
const botconfig = require('../botconfig.json');
const request = require('request');
const separator = require('thousand-separator');

module.exports = bot => {
    console.log('Moór készemn áll a megpróbáltatásokra!');

    let prefix = prefixJSON.prefix;

    let statuszok = [
        `${prefix}help`,
        'Forgatás definíciója',
        'Zokniszabály',
        'Aranyérkenőcs',
        'Baszatáska',
    ];
  
    setInterval(function() {
        let status = statuszok[Math.floor(Math.random() * statuszok.length)];
        bot.user.setActivity(status, { type: "PLAYING" });
    }, 5000);
    
    const url1 = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&key=' + process.env.YT_API_KEY;
    const url2 = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=' + process.env.YT_API_KEY;

    let PewDiePieChannel = bot.channels.find(x => x.id == '538258585612845076');
    let FUJtSeriesChannel = bot.channels.find(x => x.id == '538258717368647692');
    let differenceChannel = bot.channels.find(x => x.id == '538258765917716511');

    setInterval(function() {
        request(url2, (err, resp, html) => {
            if(!err && resp.statusCode === 200) {
                let info = JSON.parse(html);
    
                let FUJtSeriesSub = info.items[0].statistics.subscriberCount;
    
                FUJtSeriesChannel.setName(`T-Series: \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 ${separator(FUJtSeriesSub)}`);
    
    
                request(url1, (err, resp, html) => {
                    if(!err && resp.statusCode === 200) {
                        let info = JSON.parse(html);
            
                        let PewDiePieSub = info.items[0].statistics.subscriberCount;
            
                        PewDiePieChannel.setName(`PewDiePie: \xa0\xa0 ${separator(PewDiePieSub)}`);
    
                        differenceChannel.setName(`Külömbség: \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 ${separator(PewDiePieSub - FUJtSeriesSub)}`);
                    }
                });
            }
        });
    }, 10000);

    //bot.user.setAvatar(botconfig.moor_avatar);

    bot.user.setStatus('Online');
}