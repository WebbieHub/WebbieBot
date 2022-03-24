import fs from "node:fs";
import path from "path";
import { Client, Collection, Intents } from 'discord.js';
import { getLevel } from "./xp";
import axios from "axios";
import { getMessageType, isMilestoneStreak } from "../misc";
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
        // get xp for message
        const type = await getMessageType(interaction);
        const userId = interaction.author.id;
        // TODO not complex but awful readability maybe worth expanding
        let { data: { user, levelUp } } = await axios.post(`${host}/api/user/message`, { userId, tag: interaction.author.tag, type });
        if (!user) {
            console.error('a terrible error has occurred')
            return
        }
        
        if (levelUp) {
            interaction.channel.send(`:star2: **LEVEL UP** :star2: \n <@${userId}> has reached level ${user.level}`)
        }
        
        if (type === "standup") {
            if (isMilestoneStreak(user.streak)) {
                interaction.channel.send(`:fire: **Congrats** to <@${userId}> for reaching a **${user.streak} day** streak :fire:`);
            } else if (user.streak == 0) {
                interaction.channel.send(`:fire: <@${userId}> has started a new streak. **Keep it up!** :fire:`)
            }
        }
    })
})


client.login(process.env.BOT_TOKEN);
