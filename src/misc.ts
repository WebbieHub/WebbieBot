// miscellaneous helper functions
import { Message } from "discord.js";
export type messageType = "standup" | "challenge" | "feedback" | "reply" | "message";

/**
 * returns whether or not the streak is a milestone
 * @param streak 
 * @returns true if streak is a milestone
 */
export function isMilestoneStreak(streak: number) {
    // current conditions: streak is 5,7,14,25 or multiple of 50
    return ([5,7,14,25].includes(streak) || streak % 50 === 0) && streak > 0;
}

/**
 * Analyze a message in discord and return type of interaction it is
 * @param interaction The message sent by a discord user
 */
export async function getMessageType(interaction: Message<boolean>): Promise<messageType> {
    if (interaction.channelId === process.env.STANDUP_ID) {
        // check if its, first daily standup, otherwise process as usual
        const messages = await interaction.channel.messages.fetch({ limit: 100 });
        let firstToday = true;
        for (const message of messages) {
            if (
                message[1].createdAt.getDate() === (new Date()).getDate()
                && message[1].author.id === interaction.author.id
                && message[1].id !== interaction.id
            ) {
                firstToday = false;
                break;
            }
        }

        if (firstToday) {
            return "standup";
        }
    }
    // otherwise, check other types of messages
    if (interaction.channelId === process.env.CHALLENGE_ID) {
        // post in challenges channel
        return "challenge";
    } else if (interaction.channelId === process.env.FEEDBACK_ID && interaction.type === "REPLY") {
        return "feedback";
    } else if (interaction.type === "REPLY") {
        return "reply";
    }
    return "message";
}