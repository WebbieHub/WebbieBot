import { User } from "../db/user";
import { getUserMultiplier, getMessageScore, getLevel, getXPToNextLevel } from "./xp";

describe("testing xp/level relation", () => {
    test("general xp/level behaviour", () => {
        expect(getLevel(0)).toStrictEqual(1);
        expect(getLevel(-100)).toStrictEqual(1);
    });
    test("xp/level comparison", () => {
        expect(getLevel(65)).toStrictEqual(getLevel(
            getXPToNextLevel(0, 1)
            + getXPToNextLevel(1, 2)
        ))
    })
})

function getMockUser(streak: number, pLen: number, wLen: number): User {
    return {
        level: 0, // irrelevant
        participated: [...new Array(pLen)].map((_,i) => `${i}`), // no events
        won: [...new Array(wLen)].map((_,i) => `${i}`), // no events
        streak: streak, // he new
        tag: "", // irrelevant
        userId: "", // irrelevant
        xp: 0, // irrelevant
    }
}

// test users
const newUser = getMockUser(0,0,0);
const regUser = getMockUser(20,3,0);
const bigUser = getMockUser(150,20,4);

describe("testing user multiplier", () => {
    test("general relation", () => {
        expect(getUserMultiplier(newUser)).toBeGreaterThanOrEqual(1);
        expect(getUserMultiplier(regUser)).toBeGreaterThan(getUserMultiplier(newUser));
        expect(getUserMultiplier(bigUser)).toBeGreaterThan(getUserMultiplier(regUser));
    })
})
