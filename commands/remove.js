const { canModifyQueue } = require("../util/NirobotUtil");

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "لمسح موسيقى من طبور عرض الموسيقى",
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
    if (!queue) return message.channel.send("**لا يوجد معلومات في طابور التشغيل**").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`** الأستعمال: ${message.client.prefix}remove <رقمة المقطع الصوتي في طابور عرض الموسيقى> **`);
    if (isNaN(args[0])) return message.reply(`** الأستعمال: ${message.client.prefix}remove <رقمة المقطع الصوتي في طابور عرض الموسيقى> **`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`**${message.author} ❌ مسح \`${song[0].title}\` من الطابور **`);
  }
};
