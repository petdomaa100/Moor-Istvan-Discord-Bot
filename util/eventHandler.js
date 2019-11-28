const reqEvent = (event) => require(`../events/${event}`);

module.exports = (bot) => {
    bot.on("ready", () => reqEvent("ready") (bot));
    bot.on("guildMemberAdd", (member) => reqEvent("member_join") (bot, member));
    bot.on("guildMemberRemove", (member) => reqEvent("member_leave") (bot, member));
    bot.on("presenceUpdate", (oldMember, newMember) => reqEvent("presenceUpdate") (oldMember, newMember));
    bot.on("reconnecting", () => reqEvent("reconnecting") (bot));
    bot.on("disconnect", () => reqEvent("disconnect") (bot));
    bot.on("error", reqEvent("error"));
}