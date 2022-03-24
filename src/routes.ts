import { NextFunction, Request, Response, Router } from "express";
import { getMessageScore, getXPToNextLevel, xpMap } from "./bot/xp";
import client from "./db/connect";
import UserService, { User } from "./db/user";
import { messageType } from "./misc";

// create instances of services and router
const router = Router();
const userService = new UserService(client);

router.get("/ping", (req: Request, res: Response, next: NextFunction) => {
    res.send({ message: "pong" })
})

router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAll();
        res.send({ users });
    } catch(e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

// get user stats by tag
router.post('/user/stats', async (req, res, next) => {
    try {
        const { tag } = req.body
        const user = await userService.getByTag(tag);
        const xpToNext = getXPToNextLevel(user?.xp || 0, user?.level || 0);
        res.send({ user, xpToNext });
    } catch(e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

// handle message
router.post('/user/message', async (req, res, next) => {
    try {
        const { userId, tag, type } = req.body;
        const baseXp = xpMap[type as messageType];
        console.log('starting with baseXp', baseXp, 'for msg type', type)
        const isStandup = type === "standup";
        const [user, levelUp] = await userService.handleMessage(userId, tag, baseXp, isStandup);
        res.send({ user, levelUp });
    } catch(e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

router.post('/auth', async (req, res, next) => {
    try {
        const { token } = req.body;
        res.send({ auth: process.env.AUTH_TOKEN && process.env.AUTH_TOKEN === token });
    } catch(e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

router.get("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        res.send({ user });
    } catch (e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

export default router;
