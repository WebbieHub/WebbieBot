import { NextFunction, Request, Response, Router } from "express";
import client from "./db/connect";
import UserService, { User } from "./db/user";

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

router.post('/auth', async (req, res, next) => {
    try {
        const { token } = req.body;
        res.send({ auth: process.env.AUTH_TOKEN && process.env.AUTH_TOKEN === token });
    } catch(e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

router.post("/user", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, tag } = req.body
        const user = await userService.createUser(userId, tag);
        res.send({ user });
    } catch (e) {
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


router.patch("/user/:userId/standup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const streak = await userService.didStandup(req.params.userId);
        res.send({ streak });
    } catch (e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

router.get("/user/:userId/checkResetStreak", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userService.checkResetStreak(req.params.userId);
        res.send({ message: "checked" });
    } catch (e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})

router.patch("/user/:userId/:xp", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const levelUp = await userService.addXp(req.params.userId, parseFloat(req.params.xp));
        res.send({ levelUp });
    } catch (e) {
        console.error(e);
        res.status(500).send("Something went wrong");
    }
})


export default router;
