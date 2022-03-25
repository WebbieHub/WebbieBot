import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import axios from "axios";

const greetings = [
    "Hi there! Great to see you 😀",
    "Hi! Hope you're having a wonderful day 🌞",
    "zzzzzz.....? 😪💤",
    "So we meet again....",
    "Hey! Have you done your daily standup?",
    "Hi there! What are you working on?"
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('Replies with greeting'),
    execute(interaction: CommandInteraction) {
        interaction.reply(greetings[Math.floor(Math.random() * greetings.length + 1)]);
    }
}