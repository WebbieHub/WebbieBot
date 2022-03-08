import { MongoClient, Collection } from "mongodb";

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
        return await this.userCol.insertOne({
            userId,
            xp: 0,
            level: 0,
            streak: 0,
            participated: [],
            won: [],
        });
    }

    async getUserById(userId: string) {
        return await this.userCol.findOne({ userId });
    }

    async addXp(userId: string, xp: number) {
        // TODO get xp and add and check/update level
        return await this.userCol.findOneAndUpdate({ userId }, { $inc: { xp } })
    }
}
