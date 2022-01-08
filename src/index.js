const { token, channel } = require("../config.json");
const { Client, Intents } = require("discord.js");

const client = new Client({ intents: new Intents(32767) });  // 32767 is all intents

client.on("messageCreate", async message => {
    if (!client.isReady()) return;
    if (message.channel.id !== channel) return;
    if (!/^\d+$/.test(message.content)) return await message.delete();  // delete if message does not contain only digits

    const number = Number(message.content);
    const lastMessage = (await (await message.guild.channels.cache.get(channel)).messages.fetch({ limit: 2 })).last();
    if (lastMessage.content === message.content) {  // in this case, there were no messages in the channel before this event was fired
        if (number > 1) return await message.delete();  // starting from 0 or 1 is allowed
        return;
    }

    if (message.author.equals(lastMessage.author)) return await message.delete();
    const lastNumber = Number(lastMessage.content);

    if (number - lastNumber !== 1) {
        await message.delete();
    }
});

client.on("messageUpdate", async (_, after) => {
    if (!client.isReady()) return;
    if (after.channel.id !== channel) return;
    if (!/^\d+$/.test(after.content)) return await after.delete();

    const number = Number(after.content);
    const lastMessage = (await (await after.guild.channels.cache.get(channel)).messages.fetch({ limit: 2 })).last();
    if (after.author.equals(lastMessage.author)) return await after.delete();
    const lastNumber = Number(lastMessage.content);

    if (number - lastNumber !== 1) {
        await after.delete();
    }
});

client.login(token);