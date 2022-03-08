import { Interaction, Message, MessageInteraction } from "discord.js";
import { User } from "../db/user"

export const xpMap = {
    standup: 15, // first message of calendar day in daily standup channel
    challenge: 5, // posted a message in challenges chat
    giveFeedback: 5, // reponded to someone in feedback channel
    // replyToPing: 4, // respond to being pinged -- not sure how to do this yet
    reply: 2, // responded to someone
    message: 1, // any message seen by WebbieBot
    // we will manually add points (15 rn) for 
}

/**
 * Get the xp multiplier for a given user
 * @param user user object to get multiplier for
 */
export function getUserMultiplier(user: User) {
    // multiplier is determined by streak length, events participated and events won
    const streakMultiplier = user.streak / 100;
    const participateMultiplier = user.participated.length / 8;
    const winMultiplier = user.won.length / 4;
    return 1 + streakMultiplier + participateMultiplier + winMultiplier;
}

export async function getMessageScore(interaction: Message<boolean>) {
    if (interaction.channelId === process.env.STANDUP_ID) {
        // check if its, first daily standup, otherwise process as usual
        const messages = await interaction.channel.messages.fetch({ limit: 100 });
        let firstToday = true;
        for (const message of messages) {
            if (message[1].createdAt.getDate() === (new Date()).getDate()) {
                firstToday = false;
                break;
            }
        }

        if (firstToday) {
            return xpMap.standup;
        }
    }
    // otherwise, check other types of messages
    if (interaction.channelId === process.env.CHALLENGE_ID) {
        // post in challenges channel
        return xpMap.challenge;
    } else if (interaction.channelId === process.env.FEEDBACK_ID && interaction.type === "REPLY") {
        return xpMap.giveFeedback;
    } else if (interaction.type === "REPLY") {
        return xpMap.reply;
    }
    return xpMap.message;
}