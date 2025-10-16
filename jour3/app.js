import dotenv from 'dotenv'
import express from 'express'
import { registeredUsers, tokens } from './inMemoryUserRepository.js'
dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3000

function checkToken(req, res, next){
    const inputToken = req.headers.authorization
    const validToken = tokens.find(tokenObj => tokenObj[inputToken])
    if (validToken){
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
    const restrictedUrls = ['/hello', '/login']
    const selectedUrl = req.path
    
    if (restrictedUrls.includes(selectedUrl)){
        next()
    } else {
        checkToken(req, res, next)
    }
}

// function getRegisteredUsers(){
//     return registeredUsers
// }

function checkCredentials(req, res, next){
    const {email, password} = req.body
    
    const userFound = registeredUsers.find(user => user.email === email && user.password === password)
    
    if (userFound){
        next()
    } else {
        res.status(403).json({ message: "Incorect credentials" });
    }
}

app.use(express.json())
//app.use(urlCheckMiddleware)
app.use(firewall)
//app.use(checkToken)

app.get('/hello', (req, res) => {
    res.send("<h1>hello</h1>")
})

app.get('/restricted1', (req, res) => {
    res.status(200).json({"message":"topsecret"})
})

app.get('/restricted2', (req, res) => {
    res.status(200).send("<h1>Admin space</h1>")
})

app.post('/login', checkCredentials, (req, res) => {
    const {email, password} = req.body
    
    if (!email || !password) {
        return res.status(403).json({ message: "Email and password required" })
    }
    
    const token = String(Math.floor(Math.random() * 101))
    tokens.push({[token] : email})
    res.status(200).json({ token: token })
})

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
})