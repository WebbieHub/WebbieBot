import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deez')
        .setDescription('Replies with NUTS'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply("NUTS");
    }
}