import { NextFunction, Request, Response } from "express";
import express from 'express'
import { config } from "dotenv"
config();
const app = express();
import "./bot/bot"

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(301).redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=0&scope=bot%20applications.commands`);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
})