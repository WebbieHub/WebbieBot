import { MongoClient, Collection } from "mongodb";
import { getLevel } from "../bot/xp";

// user actions
export interface User {
    userId: string,
    xp: number,
    level: number,
    streak: number,
    participated: string[],
    won: string[],
}

export interface UserDB extends User {
    _id: string,
}

export default class UserService {
    private userCol: Collection<User>;
    constructor(client: MongoClient) {
        this.userCol = client.db("WebbieBot").collection("Users");
    }

    async createUser(userId: string) {
        const user: User = {
            userId,
            xp: 0,
            level: 0,
            streak: 0,
            participated: [],
            won: [],
        };
        const result = await this.userCol.insertOne(user);
        if (result.acknowledged) {
            return user;
        }
        return null;
    }

    async getUserById(userId: string) {
        return await this.userCol.findOne({ userId });
    }

    /**
     * Adds xp to user and checks for a levelup
     * @param userId id of the user to add to
     * @param xp amount of xp to add
     * @returns true if level up occurred, false otherwise
     */
    async addXp(userId: string, xp: number): Promise<boolean> {
        // TODO get xp and add and check/update level
        const { value: user } = await this.userCol.findOneAndUpdate({ userId }, { $inc: { xp } })
        if (user && getLevel(user.xp) !== user.level) {
            await this.userCol.findOneAndUpdate({ userId }, {$set: {level: getLevel(user.xp)}});
            return true
        }
        return false
    }

    async didStandup(userId: string) {
        const { value: user } = await this.userCol.findOneAndUpdate({ userId }, { $inc: { streak: 1 }});
        return user?.streak;
    }
}
