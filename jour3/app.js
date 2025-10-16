import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3000

function checkTokenMiddleware(req, res, next){
    const token = req.headers.authorization
    console.log()
    if (token === "42"){
        next()
    } else{
        res.status(403).json({ message: "Accès refusé" });
    }
}

// function urlCheckMiddleware(req, res, next){
//     const headers = req.headers
//     console.log(headers)
//     next()
// }

function firewall(req, res, next){
    const restrictedUrls = ['/hello']
    const selectedUrl = req.path
    
    if (restrictedUrls.includes(selectedUrl)){
        next()
    } else {
        checkTokenMiddleware(req, res, next)
    }
}

app.use(express.json())
//app.use(urlCheckMiddleware)
app.use(firewall)
//app.use(checkTokenMiddleware)

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