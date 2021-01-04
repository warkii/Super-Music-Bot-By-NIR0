const { canModifyQueue } = require("../util/NirobotUtil");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "يقوم بتفعيل وضع التكرار في البوت",
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

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel.send(`وضع التكرار ${queue.loop ? "**مفعل**" : "**معطل**"}`).catch(console.error);
  }
};
