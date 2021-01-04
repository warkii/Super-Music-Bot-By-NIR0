const { canModifyQueue } = require("../util/NirobotUtil");

module.exports = {
  name: "stop",
  description: "لأيقاف الموسقى",
  execute(message) {
    console.log("All Copyrights Go's To @ニロ#3892",
    `   
╭━╮╱╭┳━━━┳━━┳━━━╮
┃┃╰╮┃┃╭━╮┣┫┣┫╭━╮┃
┃╭╮╰╯┃╰━╯┃┃┃┃┃╱┃┃
┃┃╰╮┃┃╭╮╭╯┃┃┃┃╱┃┃
┃┃╱┃┃┃┃┃╰┳┫┣┫╰━╯┃
╰╯╱╰━┻╯╰━┻━━┻━━━╯
    `)
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("**لا يوجد معلوات على طابور عرض الموسيقى**").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ وقف الموسيقى!`).catch(console.error);
  }
};
