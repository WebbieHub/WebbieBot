import { isMilestoneStreak } from "./misc";

describe("test milestone checking", () => {
    test("true for milestones", () => {
        expect(isMilestoneStreak(5)).toStrictEqual(true);
        expect(isMilestoneStreak(7)).toStrictEqual(true);
        expect(isMilestoneStreak(14)).toStrictEqual(true);
        expect(isMilestoneStreak(25)).toStrictEqual(true);
        expect(isMilestoneStreak(50)).toStrictEqual(true);
        expect(isMilestoneStreak(100)).toStrictEqual(true);
    })

    test("false for non-milestones", () => {
        expect(isMilestoneStreak(0)).toStrictEqual(false);
        expect(isMilestoneStreak(-50)).toStrictEqual(false);
        expect(isMilestoneStreak(3)).toStrictEqual(false);
    })
})