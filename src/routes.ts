import { NextFunction, Request, Response, Router } from "express";
import client from "./db/connect";
import UserService, { User } from "./db/user";

// create instances of services and router
const router = Router();
const userService = new UserService(client);

router.get("/ping", (req: Request, res: Response, next: NextFunction) => {
    res.send({ message: "pong" })
})

router.post("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.createUser(req.params.userId);
        res.send({ result });
    } catch (e) {
        console.error(e);
        res.status(500).send("Something went wrong")
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
