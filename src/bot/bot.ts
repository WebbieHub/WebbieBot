import fs from "node:fs";
import path from "path";
import { Client, Collection, Intents } from 'discord.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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
})


client.login(process.env.BOT_TOKEN);
