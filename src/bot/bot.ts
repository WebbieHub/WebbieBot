import fs from "node:fs";
import path from "path";
import { Client, Collection, Intents } from 'discord.js';
import { getLevel } from "./xp";
import axios from "axios";
import { getMessageType, isMilestoneStreak } from "../misc";
const host = process.env.HOST || "http://localhost:5000"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// @ts-ignore
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

// load commands
for (const file of commandFiles) {
    const command = require(path.join(__dirname, `commands/${file}`));
    // @ts-ignore
    client.commands.set(command.data.name, command);
}


/**
 * For devs: try to figure out what this function does
 * without plugging in the statements
 * @param content the string content
 * @returns bool
 */
const ___ = (content: string): string => {
    let [a,b,c,d] = content.split("");
    if (!a || !b || !c || !d) {
        return "";
    }
    const change = (prev: unknown, factor: unknown): any => 
    //@ts-ignore
        String.fromCharCode(prev.charCodeAt(0) + Math.ceil(parseInt(null,Math.random() * (30-24) + 24) * 1 / factor));
    //@ts-ignore ts compiler is not necessary
    if (b !== ([] + ![]).substring(4,5)) {
        return "";
    } else {
        b = change(b, 1.4375);
    }
    //@ts-ignore shhhhh
    if (c !== (!![] + [] + ![]).substring(3,4)) {
        return "";
    } else {
        c = change(c, 1.533333333334);
    }
    if (d !== String.fromCharCode(content.split("").reduce((acc,curr) => acc + curr.charCodeAt(0), 0) / 4 + 16)) {
        return "";
    } else {
        d = change(d, -3.285714285714);
    }
    //@ts-ignore don't worry about it typescript!!
    if (typeof + "" !== "number" && a !== String.fromCharCode(parseInt(null,35).toString().substring(0,3) - 2)) {
        return "";
    } else {
        a = change(a, 2.3)
    }
    return [a,b,c,d].join("");
}

client.once('ready', () => {
    console.log('ready!');
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        // @ts-ignore
        const command = client.commands.get(interaction.commandName);

        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply({ content: "There was an error executing this command", ephemeral: true });
        }
    })

    client.on('messageCreate', async interaction => {
        if (interaction.author.bot) return;
        if (___(interaction.content)) interaction.channel.send(___(interaction.content))

        // get xp for message
        const type = await getMessageType(interaction);
        const userId = interaction.author.id;
        // TODO not complex but awful readability maybe worth expanding
        let { data: { user, levelUp } } = await axios.post(`${host}/api/user/message`, { userId, tag: interaction.author.tag, type });
        if (!user) {
            console.error('a terrible error has occurred')
            return
        }
        
        if (levelUp) {
            interaction.channel.send(`:star2: **LEVEL UP** :star2: \n <@${userId}> has reached level ${user.level}`)
        }
        
        if (type === "standup") {
            if (isMilestoneStreak(user.streak)) {
                interaction.channel.send(`:fire: **Congrats** to <@${userId}> for reaching a **${user.streak} day** streak :fire:`);
            } else if (user.streak == 0) {
                interaction.channel.send(`:fire: <@${userId}> has started a new streak. **Keep it up!** :fire:`)
            }
        }
    })
})


client.login(process.env.BOT_TOKEN);
