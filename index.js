/**
 * All Copyright Go's To : @ニロ#3892 
 * Our Youtube Channel : https://www.youtube.com/channel/UC7QtAaqlUhBmMojJISSLJkg
 * Our Github : https://github.com/NIR0-V
 * Our Glitch : https://glitch.com/@NIR0
 * Our Repl.it : https://repl.it/@NIR0
 */

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send(`All Copyright Go's To : @ニロ#3892`))
app.listen(port, () => console.log(`All Copyright Go's To : @ニロ#3892`))

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/NirobotUtil");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("ready", () => {
  
});

client.on("ready", () => {
  console.log(`${client.user.username} is ready!`);
  console.error(`
  All Copyright's Go's To @ニロ#3892
  
███╗░░██╗██████╗░██╗░█████╗░
████╗░██║██╔══██╗██║██╔══██╗
██╔██╗██║██████╔╝██║██║░░██║
██║╚████║██╔══██╗██║██║░░██║
██║░╚███║██║░░██║██║╚█████╔╝
╚═╝░░╚══╝╚═╝░░╚═╝╚═╝░╚════╝░
  `)
  client.user.setActivity(`Music`, { type: "listening" })
  client.user.setStatus("idle")
});

client.on("warn", (info) => console.log(info));
client.on("error", console.error);


const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
  console.log(`${file} is ready || Niro Develoment`)
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});
