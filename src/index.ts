import { NextFunction, Request, Response } from "express";
import express from 'express'
import { config } from "dotenv"
config();
const app = express();
import "./bot/bot";
import router from "./routes";
import path from "path";

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../website")))

app.get('/invite', (req: Request, res: Response, next: NextFunction) => {
    res.status(301).redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=2415987776&scope=bot%20applications.commands`);
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "../website/index.html"));
})

app.get('/admin', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "../website/admin.html"));
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
})