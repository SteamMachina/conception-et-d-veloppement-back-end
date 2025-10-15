import dotenv from 'dotenv'
import express from 'express'
import { getUsers, insert_user } from './db_utils.js'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.json())

function loggerMiddleware(request, response, next){
    console.log("nouvelle requête entrante")
    next()
}

app.get('/users', loggerMiddleware, async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/users', loggerMiddleware, async (req, res) => {
    try {
        const newUser = await insert_user(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
})