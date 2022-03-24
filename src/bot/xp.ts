import { Message } from "discord.js";
import { User } from "../db/user"
import { getMessageType } from "../misc";

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
export function getUserMultiplier(user: User | null) {
    if (!user) {
        return 1;
    }
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
    return xp <= 0 ? 1 : Math.ceil(Math.sqrt(xp) / 4);
}

/**
 * Get xp needed until next level
 * @param xp The user's current xp
 * @param currLevel The user's current level
 * @returns XP amount needed to level up
 */
export function getXPToNextLevel(xp: number, currLevel: number) {
    // level = ceil[log(xp)/2], xp = e^2(level) UNSURE ABOUT CORRECTNESS
    // return exp needed for level currLevel+1 subtract current xp
    return currLevel === 0 ? 1 : Math.floor(Math.ceil(16 * (currLevel)**2)) - xp
}