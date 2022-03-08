import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import axios from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong from backend api'),
    async execute(interaction: CommandInteraction) {
        const response: any = await axios.get("http://localhost:5000/api/ping");
        await interaction.reply(response.data.message);
    }
}