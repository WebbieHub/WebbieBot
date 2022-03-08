import fs from "node:fs";
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from 'dotenv';
config();

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN || '');

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || '', process.env.DEV_GUILD_ID || ''), { body: commands })
    .then(() => console.log('registered app commands'))
    .catch(console.error);