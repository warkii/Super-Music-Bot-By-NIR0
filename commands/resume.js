const { canModifyQueue } = require("../util/NirobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "لأستكمال المقطع الصوتي",
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
    if (!queue) return message.reply("**لا يوجد معلومات في طابور التشغيل**").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`**${message.author} ▶ استكمل الموسيقى**`).catch(console.error);
    }

    return message.reply("**طابور العرض غير متوقف لأستكماله**").catch(console.error);
  }
};
