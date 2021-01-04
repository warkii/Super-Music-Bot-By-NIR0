const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "يعطيك معلومات عن أوامر البوت",
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
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`**أوامر البوت**`)
      .setColor("#F8AA2A");
    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
        );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error),
    message.author.send(`**تصتطيع صنع بوت مثل هذا من هنا 
    \nhttps://github.com/NIR0-V/Super-NMusic-Bot.git**`)
  }
};