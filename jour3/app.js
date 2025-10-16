import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3000

function checkTokenMiddleware(req, res, next){
    const token = req.headers.token
    if (token === "42"){
        next()
    } else{
        res.status(403).json({ message: "Accès refusé" });
    }
}

app.use(express.json())
app.use(checkTokenMiddleware)

app.get('/hello', (req, res) => {
    res.send("<h1>hello</h1>")
})

app.get('/restricted1', (req, res) => {
    res.status(200).json({"message":"topsecret"})
})

app.get('/restricted2', (req, res) => {
    res.status(200).send("<h1>Admin space</h1>")
})

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
})