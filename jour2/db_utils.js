import { Client, Pool } from 'pg'
import dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config()

async function getConnection(){
    const client = new Client({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        port     : process.env.DB_PORT
    })

    await client.connect()
    return client
}

const client = await getConnection()

async function getUsers(){
    try {
        const res = await client.query("SELECT * FROM users")
        console.log(res.rows) 
        return res.rows
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function insert_user(user){
    try{
        const query = 'INSERT INTO users (email) VALUES ($1) RETURNING *';
        const values = [user.email];
        const res = await client.query(query, values);
        console.log('Inserted user:', res.rows[0]);
        return res.rows[0];
    } catch (err){
        console.error(err);
        throw err;
    }
}

// Example usage
try {
    await insert_user({email: "test@test.com"})
    await getUsers()
} catch (err) {
    console.error(err);
} finally {
    await client.end()
}