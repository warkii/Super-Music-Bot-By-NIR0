const { canModifyQueue } = require("../util/NirobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "لتغير مستوى الصوت",
  execute(message, args) {
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
    if (!canModifyQueue(message.member))
      return message.reply("**عليك الدخول لغرفه صوتية أولا**").catch(console.error);

    if (!args[0]) return message.reply(`🔊 الصوت الحالي هوا: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("**قم بكتابة مستوي الصوت المطلوب تعدبله**").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply("**لايمكن ان يتخطى مستةى الصوت 100**").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`تم تغير مستوى الصوت ل: **${args[0]}%**`).catch(console.error);
  }
};
