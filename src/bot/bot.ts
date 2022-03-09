import fs from "node:fs";
import path from "path";
import { Client, Collection, Intents } from 'discord.js';
import { getLevel, getMessageScore, getUserMultiplier } from "./xp";
import axios from "axios";
const host = process.env.HOST || "http://localhost:5000"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// @ts-ignore
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

// load commands
for (const file of commandFiles) {
    const command = require(path.join(__dirname, `commands/${file}`));
    // @ts-ignore
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('ready!');
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        // @ts-ignore
        const command = client.commands.get(interaction.commandName);

        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply({ content: "There was an error executing this command", ephemeral: true });
        }
    })

    client.on('messageCreate', async interaction => {
        if (interaction.author.bot) return;
        if (interaction.content === "deez") {
            interaction.channel.send("nuts")
        }
        const userId = interaction.author.id;
        const response = await axios.get(`${host}/api/user/${userId}`);
        if (!response.data.user) {
            const resonse2 = await axios.post(`${host}/api/user/${userId}`);
            interaction.channel.send(`<@${userId}> I've made an entry for you in the DB!`);
        } else {
            // add xp based on user multiplier and message type
            const xp = (await getMessageScore(interaction)) * getUserMultiplier(response.data.user);
            const res = await axios.patch(`${host}/api/user/${userId}/${xp}`);
            if (res.data.levelUp === true) {
                interaction.channel.send(`:star2: **LEVEL UP** :star2: \n <@${userId}> has reached level ${getLevel(response.data.user.xp + xp)}`)
            }
        }
    })
})


client.login(process.env.BOT_TOKEN);
