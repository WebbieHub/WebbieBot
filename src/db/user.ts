import { MongoClient, Collection, ObjectId, UpdateFilter, WithId } from "mongodb";
import { getLevel, getUserMultiplier } from "../bot/xp";

// user actions
export interface User {
    userId: string,
    tag: string,
    xp: number,
    level: number,
    streak: number,
    participated: string[],
    won: string[],
    lastStandup?: Date,
}

export interface UserDB extends User {
    _id: string,
}

export default class UserService {
    private userCol: Collection<User>;
    constructor(client: MongoClient) {
        this.userCol = client.db("WebbieBot").collection("Users");
    }

    async getAll() {
        return await this.userCol.find().toArray()
    }

    async getByTag(tag: string) {
        return await this.userCol.findOne({ tag: tag })
    }

    async getUserById(userId: string) {
        return await this.userCol.findOne({ userId });
    }

    async handleMessage(userId: string, tag: string, baseXp: number, isStandup: boolean): Promise<[WithId<User>, boolean]> {
        let levelUp = false;
        let user = await this.userCol.findOne({userId});
        // parse float with toFixed ensures clean, 2 decimal place xp values
        const mult = getUserMultiplier(user)
        const totalXp = parseFloat((baseXp * mult).toFixed(2));
        if (!user) {
            const newUser = {
                userId,
                tag,
                xp: totalXp,
                level: getLevel(totalXp),
                streak: isStandup ? 1 : 0,
                participated: [],
                won: [],
            }
            const { insertedId } = await this.userCol.insertOne(newUser);
            user = { ...newUser, _id: insertedId }
        } else {
            let streak = isStandup ? user.streak + 1 : user.streak;
            const { lastStandup } = user;
            if ( lastStandup && lastStandup.getDate() < (new Date()).getDate() - 1) {
                streak = 0;
            }
            let xp = user.xp + totalXp;
            let level = Math.max(user.level, getLevel(xp));
            if (level > user.level) levelUp = true
            const update: UpdateFilter<User> = {
                $set: { streak, xp, level, lastStandup: isStandup ? (new Date()) : lastStandup }
            };
            await this.userCol.findOneAndUpdate({ userId }, update)
            user = {...user, ...update.$set};
        }
        return [user, levelUp];
    }
}
