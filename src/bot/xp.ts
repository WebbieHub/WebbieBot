import { Interaction, Message, MessageInteraction } from "discord.js";
import { User } from "../db/user"
import { getMessageType, messageType } from "../misc";

export const xpMap = {
    standup: 15, // first message of calendar day in daily standup channel
    challenge: 5, // posted a message in challenges chat
    feedback: 5, // reponded to someone in feedback channel
    // replyToPing: 4, // respond to being pinged -- not sure how to do this yet
    reply: 2, // responded to someone
    message: 1, // any message seen by WebbieBot
    // we will manually add points (15 rn) for attending friday events
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

/**
 * Get xp based on a message type
 * @param interaction the message sent
 * @returns the base xp (no multiplier) of the message type
 */
export async function getMessageScore(interaction: Message<boolean>) {
    return xpMap[(await getMessageType(interaction))];
}

/**
 * Get the level for a given total xp value
 * @param xp a user's total xp
 */
export function getLevel(xp: number) {
    return Math.ceil(Math.log(xp) / 2);
}