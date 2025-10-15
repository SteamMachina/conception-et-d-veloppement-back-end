import { Client, Pool } from 'pg'

async function getConnection(username, password, database){
    const client = new Client({
        host     : 'localhost',
        user     : username,
        password : password,
        database : database
    })

    await client.connect()
    return client
}

const client = await getConnection('postgres', 'root', 'mabase')

try {
    const res = await client.query("Select * from users")
    console.log(res.rows) 
} catch (err) {
   console.error(err);
} finally {
   await client.end()
}

function getUsers(callback){
    try {
        const res = await client.query("Select * from users")
        console.log(res.rows) 
    } catch (err) {
        console.error(err);
    }
}